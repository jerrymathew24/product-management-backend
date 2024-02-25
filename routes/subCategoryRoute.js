import express from 'express'
import { UpdateCategoryController, categoryController, createCategoryController, deleteCategoryController } from '../controller/subCategoryController.js'


const router = express.Router()

//create category
router.post('/create-subcategory', createCategoryController)
//update category
router.put('/update-subcategory/:id', UpdateCategoryController)
//get all category
router.get('/get-subcategory', categoryController)
//delete category
router.delete('/delete-subcategory/:id', deleteCategoryController)
export default router 