import express from 'express'
import { createSubcategory, deleteSubcategory, getAllSubcategories } from '../controller/subCategoryController.js'


const router = express.Router();

router.get('/', getAllSubcategories);
router.post('/', createSubcategory);
router.delete('/:id', deleteSubcategory);

export default router;
