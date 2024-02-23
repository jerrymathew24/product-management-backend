import express from 'express';
import dotenv from 'dotenv'
import morgan from 'morgan';
import connectDB from './config/db.js';


//config dotenv
dotenv.config()

//config database
connectDB()

//app instance
const app = express();

//middleware
app.use(express.json())
app.use(morgan('dev'))


// Define a route handler for the root URL
app.get('/', (req, res) => {
    res.send('Hello server');
});

// Define a route handler for the '/login' URL
app.get('/login', (req, res) => {
    // Send a response to the client
    res.send('This is the login page.');
});

// Define a route handler for the '/signUp' URL
app.get('/signUp', (req, res) => {
    // Send a response to the client
    res.send('This is the signUp page.');
});

// Define a route handler for the '/cart' URL
app.get('/cart', (req, res) => {
    // Send a response to the client
    res.send('This is the cart page.');
});

// Define a route handler for the '/wishlist' URL
app.get('/wishlist', (req, res) => {
    // Send a response to the client
    res.send('This is the wishlist page.');
});


const PORT = process.env.PORT

// Start the server and listen on port 3000
app.listen(PORT, () => {
    console.log(`Server spinning on port ${PORT}`);
});
