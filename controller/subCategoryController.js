import Subcategory from '../models/subCategoryModel.js'

export const getAllSubcategories = async (req, res) => {
    try {
        const subcategories = await Subcategory.find();
        res.json(subcategories);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const createSubcategory = async (req, res) => {
    const subcategory = new Subcategory({
        name: req.body.name,
        category: req.body.category
    });

    try {
        const newSubcategory = await subcategory.save();
        res.status(201).json(newSubcategory);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

export const deleteSubcategory = async (req, res) => {
    try {
        await Subcategory.findByIdAndDelete(req.params.id);
        res.json({ message: 'Subcategory deleted' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
