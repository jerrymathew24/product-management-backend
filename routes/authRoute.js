import express from 'express'
import { registerUser } from './../controller/authController.js';

const router = express.Router()

//routes
//register || POST
router.post('/register', registerUser)

export default router   