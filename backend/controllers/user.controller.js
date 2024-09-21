import { User } from "../models/user.model.js";
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
export const register = async (req,res) => {
    try {
        const {name,email,password} = req.body
        if(!name || !email || !password){
            return res.status(400).json({
                message: 'Something is missing',
                success: false
            })
        }
        const existingUser = await User.findOne({email})
        if(existingUser){
            return res.status(400).json({
                message: 'User already registered',
                success: false
            })
        }

        const hashPassword = await bcrypt.hash(password, 10)
        const user = new User({
            name,
            email,
            password: hashPassword
        })
        await user.save()
        return res.status(200).json({
            message: 'User registered successfully',
            user,
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

export const login = async (req,res) => {
    try {
        const {email, password} = req.body
        if(!email || !password){
            return res.status(400).json({
                message: 'Something is missing',
                success: false
            })
        }
        const user = await User.findOne({email})
        if(!user){
            return res.status(400).json({
                message: 'Incorrect email',
                success: false
            })
        }
        const isMatched = await bcrypt.compare(password, user.password)
        if(!isMatched){
            return res.status(400).json({
                message: 'Incorrect password',
                success: false
            })
        }

        const token = jwt.sign({id:user._id, name:user.name},process.env.SECRET,{expiresIn: '1d'})
        return res.status(200).json({
            message: 'User loggedin successfully',
            user,
            token,
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