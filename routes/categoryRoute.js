import express from 'express'
import { createCategory, deleteCategory, getAllCategories } from '../controller/categoryController.js'

const router = express.Router();

router.get('/', getAllCategories);
router.post('/', createCategory);
router.delete('/:id', deleteCategory);

export default router;
