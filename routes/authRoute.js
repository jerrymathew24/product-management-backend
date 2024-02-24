import express from 'express'
import { loginUser, registerUser, testController } from './../controller/authController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router()

//routes
//register || POST
router.post('/register', registerUser)
router.post('/login', loginUser)
router.get('/test', protect, testController)

export default router   