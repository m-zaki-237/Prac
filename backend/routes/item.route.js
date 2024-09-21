import express from 'express'
import { createItem, deleteItem, getItems, getItemsById, updateItem } from '../controllers/item.controller.js'


export const itemRouter = express.Router()

itemRouter.post('/create-item',createItem)
itemRouter.get('/get-item',getItems)
itemRouter.get('/get-itemById/:id',getItemsById)
itemRouter.put('/updateItem/:id',updateItem)
itemRouter.delete('/deleteItem/:id',deleteItem)