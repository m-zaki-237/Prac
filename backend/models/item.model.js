import mongoose from "mongoose";

export const itemSchema = new mongoose.Schema({
    name: {
        type: String,
        require: true
    },
    category: {
        type: String,
        require: true
    },
    price: {
        type: Number,
        require: true
    },
    image: {
        type: String
    } 
},{timestamps: true})

export const Item = mongoose.model('Item', itemSchema)