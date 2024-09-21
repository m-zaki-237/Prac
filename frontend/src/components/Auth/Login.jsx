import axios from 'axios'
import React, { useState } from 'react'
import toast from 'react-hot-toast'
import { Link, useNavigate } from 'react-router-dom'

const Login = () => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const navigate = useNavigate()
    const handleSubmit = async (e) => {
        e.preventDefault()
        const formData = {
            email,
            password
        }
        try {
            const res = await axios.post('http://localhost:8000/api/user/login', formData)
            if(res.data.success){
                localStorage.setItem('token', res.data.token)
                navigate('/')
                toast.success(res.data.message)
            }
        } catch (error) {
            console.log("Error: ", error); 
            toast.error(error.reponse.data.message)
        }
    }
  return (
    <>
    <div className="flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-center">Login</h2>
        <form onSubmit={handleSubmit}>
        <div className="mb-4">
            <label className="block text-sm font-medium mb-2" htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e)=>setEmail(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded  focus:outline-none focus:ring-2 focus:ring-orange-500"
              placeholder="Enter your email"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium mb-2" htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e)=>setPassword(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-orange-500"
              placeholder="Enter your password"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full bg-orange-500 text-white p-2 rounded hover:bg-orange-600 focus:outline-none"
          >
            Login
          </button>
          <div className='mt-2'>
            <p>Not registered? <Link to={'/signup'} className='text-orange-500 underline'>Signup</Link></p>
          </div>
        </form>
      </div>
    </div>
    </>
  )
}

export default Login