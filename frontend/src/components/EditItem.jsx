import axios from 'axios';
import React, { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { Link, useNavigate, useParams } from 'react-router-dom';

const Edit = () => {
    const initialItem = {
        name: '',
        category: '',
        price: '',
        image: ''
    };
    const navigate = useNavigate();
    const { id } = useParams();
    const [item, setItem] = useState(initialItem);

    const inputChangeHandler = (e) => {
        const { name, value } = e.target;
        setItem({ ...item, [name]: value });
    };

    useEffect(() => {
        axios.get(`http://localhost:8000/api/item/get-itemById/${id}`)
            .then((response) => {
                console.log("Fetched item data:", response.data.fetchedItem);
                setItem(response.data.fetchedItem);
            })
            .catch((error) => {
                console.log("Error: ", error);
            });
    }, [id]);

    const submitForm = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.put(`http://localhost:8000/api/item/updateItem/${id}`, item);
            if (res.data.success) {
                toast.success(res.data.message);
                navigate('/items');
            }
        } catch (error) {
            console.log("Error: ", error);
            toast.error(error.response.data.message);
        }
    };

    return (
        <div className='p-4 max-w-7xl mx-auto'>
            <div className='bg-white p-6 rounded-lg shadow-md max-w-6xl mx-auto'>
                <Link to={'/items'} className='text-red-400 underline'>Back</Link>
                <h1 className='text-2xl font-semibold mb-4'>Update Item</h1>
                <form onSubmit={submitForm}>
                    <div className='flex flex-col mb-4'>
                        <label htmlFor="name" className="mb-1 font-medium">Name</label>
                        <input
                            type="text"
                            id="name"
                            name="name"
                            placeholder='Edit your name'
                            value={item?.name || ''}
                            onChange={inputChangeHandler}
                            className='w-full p-2 border rounded-md outline-none focus:border-orange-500'
                        />
                    </div>
                    <div className='flex flex-col mb-4'>
                        <label htmlFor="category" className="mb-1 font-medium">Category</label>
                        <input
                            type="text"
                            id="category"
                            name="category"
                            placeholder='Edit your category'
                            value={item?.category || ''}
                            onChange={inputChangeHandler}
                            className='w-full p-2 border rounded-md outline-none focus:border-orange-500'
                        />
                    </div>
                    <div className='flex flex-col mb-4'>
                        <label htmlFor="category" className="mb-1 font-medium">Price</label>
                        <input
                            type="number"
                            id="price"
                            name="price"
                            placeholder='Edit your price'
                            value={item?.price || ''}
                            onChange={inputChangeHandler}
                            className='w-full p-2 border rounded-md outline-none focus:border-orange-500'
                        />
                    </div>
                    <div className='flex flex-col mb-4'>
                        <label htmlFor="category" className="mb-1 font-medium">Image</label>
                        <input
                            type="text"
                            id="image"
                            name="image"
                            placeholder='Edit your image'
                            value={item?.image|| ''}
                            onChange={inputChangeHandler}
                            className='w-full p-2 border rounded-md outline-none focus:border-orange-500'
                        />
                    </div>
                    <button type='submit' className='w-full bg-orange-500 hover:bg-orange-600 duration-300 text-white py-2 rounded-md mt-2'>
                        Save Changes
                    </button>
                </form>
            </div>
        </div>
    );
};

export default Edit;
