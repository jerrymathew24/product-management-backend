import express from 'express'
import { loginUser, registerUser, testController } from './../controller/authController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router()

//routes
//register || POST
router.post('/register', registerUser)
//login || POST
router.post('/login', loginUser)
//test || GET
router.get('/test', protect, testController)
//protected || GET
router.get('/user-auth', protect, (req, res) => {
    res.status(200).send({ ok: true })
})

export default router   