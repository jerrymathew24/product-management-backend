import asyncHandler from "express-async-handler"
import User from "../models/userModel.js";
import { hashPassword } from "../helper/authHelper.js";

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

