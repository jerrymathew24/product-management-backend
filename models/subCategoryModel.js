import mongoose from 'mongoose'

const categorySchema = new mongoose.Schema({
    category: {
        type: mongoose.ObjectId,
        ref: 'Category',
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


export default mongoose.model('SubCategory', categorySchema)