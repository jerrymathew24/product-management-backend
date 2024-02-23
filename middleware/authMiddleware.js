import asyncHandler from "express-async-handler";
import JWT from 'jsonwebtoken'

//protect routes with the help of jwt
export const protect = asyncHandler(async (req, res, next) => {
    try {
        const decode = JWT.verify(req.headers.authorization, process.env.JWT_SECRET)
        next()
    } catch (error) {
        console.log(error)
        res.status(401)
        throw new Error("User not Authorized")
    }
})