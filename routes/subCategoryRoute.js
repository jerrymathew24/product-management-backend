import express from 'express'
import { UpdateSubCategoryController, createSubCategoryController, deleteSubCategoryController, subCategoryController } from '../controller/subCategoryController.js'


const router = express.Router()

//create category
router.post('/create-subcategory', createSubCategoryController)
//update category
router.put('/update-subcategory/:id', UpdateSubCategoryController)
//get all category
router.get('/get-subcategory', subCategoryController)
//delete category
router.delete('/delete-subcategory/:id', deleteSubCategoryController)
export default router 