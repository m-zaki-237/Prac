import { Item } from "../models/item.model.js";

export const createItem = async (req,res) => {
    try {
        const {name,category,price,image} = req.body
        const item = new Item({
            name,
            category,
            price,
            image
        })
        await item.save()
        return res.status(200).json({
            message: 'Item created successfully',
            item,
            success: true
        })
    } catch (error) {
        console.log("Error: ",error);
        return res.status(500).json({
            message: 'Server error',
            success: false
        })
    }
}

export const getItems = async (req,res) => {
    try {
        const items = await Item.find()
        if(!items){
            return res.status(400).json({
                message: 'Items not found',
                success: false
            })
        }

        return res.status(200).json({
            message: 'List of all items',
            items,
            success: true
        })
    } catch (error) {
        console.log("Error: ",error);
        return res.status(500).json({
            message: 'Server error',
            success: false
        })
    }
}

export const getItemsById = async (req,res) => {
    try {
        const {id} = req.params
        const fetchedItem = await Item.findById(id)
        if(!fetchedItem){
            return res.status(400).json({
                message: 'Item not found',
                success: false
            })
        }

        return res.status(200).json({
            message: 'Item of desired id',
            fetchedItem,
            success: true
        })
    } catch (error) {
        console.log("Error: ",error);
        return res.status(500).json({
            message: 'Server error',
            success: false
        })
    }
}

export const updateItem = async (req,res) => {
    try {
        const {id} = req.params
        const item = req.body

        const updatedItem = await Item.findByIdAndUpdate(id, item, {new: true, runValidators: true})
        if(!updatedItem){
            return res.status(400).json({
                message: 'Item not updated',
                success: false
            })
        }

        return res.status(200).json({
            message: 'Item updated successfully',
            updatedItem,
            success: true
        })
    } catch (error) {
        console.log("Error: ",error);
        return res.status(500).json({
            message: 'Server error',
            success: false
        })
    }
}

export const deleteItem = async (req,res) => {
    try {
        const {id} = req.params
        const deletedItem = await Item.findByIdAndDelete(id)
        if(!deletedItem){
            return res.status(400).json({
                message: 'Item not deleted',
                success: true
            })
        }

        return res.status(200).json({
            message: 'Item deleted successfully',
            success: true
        })
    } catch (error) {
        console.log("Error: ",error);
        return res.status(500).json({
            message: 'Server error',
            success: false
        })
    }
}