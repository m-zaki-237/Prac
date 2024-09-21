import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import toast from 'react-hot-toast'

const CreateItem = () => {
    const [name, setName] = useState('')
    const [category, setCategory] = useState('')
    const [price, setPrice] = useState('')
    const [image, setImage] = useState('')
    const navigate = useNavigate()

    const handleSubmit = async (e) => {
        e.preventDefault()
        const formData = {
            name,
            category,
            price,
            image
        }
        try {
            await axios.post('http://localhost:8000/api/item/create-item', formData)
            toast.success('Item created successfully.')
            navigate('/items')
        } catch (error) {
            console.log("Error creating item: ", error)
            toast.error('Failed to create item.')
        }
    }

    return (
        <div className="max-w-4xl mx-auto p-6">
            <h2 className="text-2xl font-bold mb-4 text-center">Create Item</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <label className="block mb-1">Name:</label>
                    <input 
                        type="text" 
                        value={name} 
                        onChange={(e) => setName(e.target.value)} 
                        className="border p-2 w-full" 
                        placeholder='Enter item name'
                        required 
                    />
                </div>
                <div>
                    <label className="block mb-1">Category:</label>
                    <input 
                        type="text" 
                        value={category} 
                        onChange={(e) => setCategory(e.target.value)} 
                        className="border p-2 w-full" 
                        placeholder='Enter item category'
                    />
                </div>
                <div>
                    <label className="block mb-1">Price:</label>
                    <input 
                        type="number" 
                        value={price} 
                        onChange={(e) => setPrice(e.target.value)} 
                        className="border p-2 w-full"
                        placeholder='Enter item price'
                        required 
                    />
                </div>
                <div>
                    <label className="block mb-1">Image:</label>
                    <input 
                        type="text"
                        value={image}
                        onChange={(e) => setImage(e.target.value)} 
                        placeholder='Enter imageUrl'
                        className="border p-2 w-full" 
                    />
                </div>
                <button type="submit" className="w-full p-2 bg-orange-500 text-white rounded">Create Item</button>
            </form>
        </div>
    )
}

export default CreateItem
