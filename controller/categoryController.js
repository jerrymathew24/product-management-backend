import Category from '../models/categoryModel.js'
import slugify from 'slugify'

export const createCategoryController = async (req, res) => {
    try {
        const { name } = req.body
        if (!name) {
            res.status(401).send({
                message: "Name is required"
            })
        }
        const existingCategory = await Category.findOne({ name })
        if (existingCategory) {
            res.status(200).send({
                message: 'Category already exists'
            })
        }
        const category = await new Category({ name, slug: slugify(name) }).save()
        res.status(201).send({
            success: true,
            message: "new Category created",
            category
        })
    } catch (error) {
        console.log(error)
        res.status(500).send({
            success: false,
            message: "Error in category",
            error
        })
    }
}

export const UpdateCategoryController = async (req, res) => {
    try {
        const { name } = req.body
        const { id } = req.params
        const category = await Category.findByIdAndUpdate(id, { name, slug: slugify(name) }, { new: true })
        res.status(200).send({
            success: true,
            message: "category updated successfully",
            category
        })
    } catch (error) {
        res.status(500).send({
            success: false,
            message: "error in category update",
            error
        })
    }
}

export const categoryController = async (req, res) => {
    try {
        const category = await Category.find({})
        res.status(200).send({
            success: true,
            message: "All categories list",
            category
        })
    } catch (error) {
        console.log(error)
        res.status(500).send({
            success: false,
            message: "error while getting all categories",
            error
        })
    }
}

export const deleteCategoryController = async (req, res) => {
    try {
        const { id } = req.params
        await Category.findByIdAndDelete(id)
        res.status(200).send({
            success: true,
            message: "deleted category successfully"
        })
    } catch (error) {
        console.log(error)
        res.status(500).send({
            success: false,
            message: "error while deleting category",
            error

        })
    }
}