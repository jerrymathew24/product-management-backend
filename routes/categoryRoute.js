import express from 'express'
import { UpdateCategoryController, categoryController, createCategoryController, deleteCategoryController } from '../controller/categoryController.js'


const router = express.Router()

//create category
router.post('/create-category', createCategoryController)
//update category
router.put('/update-category/:id', UpdateCategoryController)
//get all category
router.get('/get-category', categoryController)
//delete category
router.delete('/delete-category/:id', deleteCategoryController)
export default router 