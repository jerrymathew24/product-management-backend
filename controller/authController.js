import asyncHandler from "express-async-handler"
import User from "../models/userModel.js";
import { comparePassword, hashPassword } from "../helper/authHelper.js";
import { protect } from "../middleware/authMiddleware.js";
import { errorHandler } from "../middleware/errorMiddleware.js";
import JWT from 'jsonwebtoken'


//@desc register new user
//@route POST /register
export const registerUser = asyncHandler(async (req, res) => {
    console.log("User registration call reached server");
    try {
        const { name, email, password } = req.body
        //validation
        if (!name || !email || !password) {
            res.status(400);
            throw new Error("All fields are required");
        }
        const [nameExists, emailExists] = await Promise.all([
            User.findOne({ name }),
            User.findOne({ email })
        ]);

        if (nameExists) {
            res.status(400);
            throw new Error("Name already exists.");
        }
        if (emailExists) {
            res.status(400);
            throw new Error("Email already exists.");
        }

        //hash password
        const hashedPassword = await hashPassword(password)

        //create user
        const user = await new User({
            name,
            email,
            password: hashedPassword
        }).save()
        res.status(201).send({
            success: true,
            message: "User created successfully",
            user
        });
    }
    catch (error) {
        console.log(error);
        res.status(500);
        throw new Error("Error registering user");
    }
})

//@desc login user
//@route POST /login
export const loginUser = asyncHandler(async (req, res) => {
    console.log("User login call reached server")
    try {
        const { email, password } = req.body;

        //validation
        if (!email || !password) {
            res.status(400);
            throw new Error("All fields are required");
        }
        //get user
        const user = await User.findOne({ email }).select("+password")

        if (!user) {
            return res.status(404).send({
                success: false,
                message: "Email is not registered"
            })
        }

        //check password
        const matchPassword = await comparePassword(password, user.password)

        if (!matchPassword) {
            return res.status(404).send({
                success: false,
                message: "Wrong Credentials"
            })
        }

        //token
        const token = await JWT.sign({ _id: user._id }, process.env.JWT_SECRET, { expiresIn: '7d' })

        res.status(200).send({
            success: true,
            message: "User Login Successfull",
            user: {
                name: user.name,
                email: user.email
            }, token
        })
    } catch (error) {
        console.log(error);
        res.status(500);
        throw new Error("Error in user login");
    }
})

//@desc test
//@route GET /TEST
export const testController = (req, res) => {
    try {
        res.send('protected route')
    } catch (error) {
        console.log(error)
        res.send({ error })
    }
}