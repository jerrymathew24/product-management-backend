import express from 'express';
import dotenv from 'dotenv'
import morgan from 'morgan';
import connectDB from './config/db.js';
import authRoute from './routes/authRoute.js'
import categoryRoute from './routes/categoryRoute.js'
import subcategoryRoute from './routes/subCategoryRoute.js'
import { errorHandler } from './middleware/errorMiddleware.js';
import cors from 'cors'



//config dotenv
dotenv.config()

//config database
connectDB()

//app instance
const app = express();

//middleware
app.use(cors())
app.use(express.json())
app.use(morgan('dev'))

//routes
app.use('/auth', authRoute)
app.use('/categories', categoryRoute)
app.use('/subcategories', subcategoryRoute)



app.use(errorHandler)


const PORT = process.env.PORT

// Start the server and listen on port 3000
app.listen(PORT, () => {
    console.log(`Server spinning on port ${PORT}`);
});
