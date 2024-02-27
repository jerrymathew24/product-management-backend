import SubCategory from '../models/subCategoryModel.js'
import slugify from 'slugify'

export const createSubCategoryController = async (req, res) => {
    try {
        const { category, name } = req.body
        if (!category) {
            res.status(401).send({
                message: "category is required"
            })
        }
        if (!name) {
            res.status(401).send({
                message: "Name is required"
            })
        }

        // const existingSubCategory = await SubCategory.findOne({ name })
        // if (existingSubCategory) {
        //     res.status(200).send({
        //         message: 'Sub Category already exists'
        //     })
        // }
        const subCategory = await new SubCategory({ category, name, slug: slugify(name) }).save()
        res.status(201).send({
            success: true,
            message: "new Sub Category created",
            subCategory
        })
    } catch (error) {
        console.log(error)
        res.status(500).send({
            success: false,
            message: "Error in sub category",
            error
        })
    }
}

export const UpdateSubCategoryController = async (req, res) => {
    try {
        const { name } = req.body
        const { id } = req.params
        const category = await SubCategory.findByIdAndUpdate(id, { name, slug: slugify(name) }, { new: true })
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

export const subCategoryController = async (req, res) => {
    try {
        const category = await SubCategory.find({})
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

export const deleteSubCategoryController = async (req, res) => {
    try {
        const { id } = req.params
        await SubCategory.findByIdAndDelete(id)
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