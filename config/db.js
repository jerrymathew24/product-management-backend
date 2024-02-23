import mongoose from "mongoose"


const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URL)
        console.log('CONNECTED TO MONGODB COMPASS')
    } catch (error) {
        console.log(`Error in MongoDB ${error}`)
    }
}


export default connectDB;