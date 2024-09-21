import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import toast from 'react-hot-toast'

const Items = () => {
    const [items, setItems] = useState([])
    const navigate = useNavigate()

    useEffect(() => {
        const token = localStorage.getItem('token')
        if (!token) {
            navigate('/login')
            toast.error('Access denied. Please log in.')
            return // Exit early if no token
        }

        const fetchItems = async () => {
            try {
                const res = await axios.get('http://localhost:8000/api/item/get-item')
                setItems(res.data.items)
            } catch (error) {
                console.log("Error fetching items: ", error)
                toast.error('Failed to fetch items.')
            }
        }

        fetchItems()
    }, [navigate])

    const handleDelete = async (id) => {
        try {
            await axios.delete(`http://localhost:8000/api/item/deleteItem/${id}`)
            setItems(items.filter(item => item._id !== id))
            toast.success('Item deleted successfully.')
        } catch (error) {
            console.log("Error deleting item: ", error)
            toast.error('Failed to delete item.')
        }
    }

    const handleEdit = (id) => {
        navigate(`/edit-item/${id}`)
    }

    const handleCreate = () => {
        navigate('/create-item')
    }

    return (
        <div className="p-6">
            <h2 className="text-2xl font-bold mb-4 text-center">Items</h2>
            <button onClick={handleCreate} className="mb-4 p-2 bg-orange-500 hover:bg-orange-600  text-white rounded">Create Item</button>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {items.map(item => (
                    <div key={item._id} className="border rounded-lg bg-slate-200 shadow-lg flex flex-col items-center p-4 transition-transform transform hover:scale-105">
                        <img src={item.image} alt={item.name} className="w-full h-40 object-cover rounded-t-lg mb-2" />
                        <h3 className="font-semibold text-lg">{item.name}</h3>
                        <p className="text-lg font-bold text-orange-600">Price: {item.price}$</p>
                        <div className="flex space-x-2 mt-2">
                            <button onClick={() => handleEdit(item._id)} className="px-2  bg-blue-500 text-white rounded">Edit</button>
                            <button onClick={() => handleDelete(item._id)} className="px-2  bg-red-500 text-white rounded">Delete</button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default Items
