import express from 'express'
import dotenv from 'dotenv'
import cors from 'cors'
import ConnectDB from './db/Conn.js'
import { userRouter } from './routes/user.route.js'
import { itemRouter } from './routes/item.route.js'

dotenv.config()
const app = express ()
app.use(express.json())
app.use(cors())

const port = process.env.PORT || 4001

ConnectDB()

app.use('/api/user', userRouter)
app.use('/api/item', itemRouter)

app.listen(port, ()=>{
    console.log(`Server listening at port: ${port}`);
})