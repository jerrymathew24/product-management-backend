import productModel from "../models/productModel.js"
import slugify from "slugify"
import fs from 'fs'



export const createProductController = async (req, res) => {
    try {
        const { name, ram, price, qty, subCategory, description } = req.fields
        const { photo } = req.files
        //validation
        switch (true) {
            case !name:
                return res.status(500).send({ error: 'Name is required' })
            case !ram:
                return res.status(500).send({ error: 'ram is required' })
            case !price:
                return res.status(500).send({ error: 'Price is required' })
            case !qty:
                return res.status(500).send({ error: 'qty is required' })
            case !subCategory:
                return res.status(500).send({ error: 'subCategory is required' })
            case !description:
                return res.status(500).send({ error: 'description is required' })
            case photo && photo.size > 100000:
                return res.status(500).send({ error: 'Photo is required and should be less than 1mb' })
        }
        const products = new productModel({ ...req.fields, slug: slugify(name) })
        if (photo) {
            products.photo.data = fs.readFileSync(photo.path)
            products.photo.contentType = photo.type
        }
        await products.save()
        res.status(201).send({
            success: true,
            message: 'Product created successfully',
            products
        })
    } catch (error) {
        console.log(error)
        res.status(500).send({
            success: false,
            error,
            message: 'error while creating product'
        })
    }
}

//get all product
export const getProductController = async (req, res) => {
    try {
        const product = await productModel.find({})
            .populate('category')
            .select('-photo')
            .limit(12)
            .sort({ createdAt: -1 })
        res.status(200).send({
            success: true,
            countTotal: product.length,
            message: 'All Products',
            product
        })
    } catch (error) {
        console.log(error)
        res.status(500).send({
            success: false,
            message: 'error in getting products',
            error: error.message
        })
    }
}