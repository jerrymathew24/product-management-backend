import mongoose from 'mongoose'

const categorySchema = new mongoose.Schema({
    category: {
        type: String,
        required: true,
    },
    name: {
        type: String,
        required: true,
        unique: true,
    },
    slug: {
        type: String,
        lowerCase: true,

    }

})


export default mongoose.model('subCategory', categorySchema)