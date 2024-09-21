import mongoose from "mongoose";

const ConnectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URL);
        console.log('Database connected');
    } catch (error) {
        console.log("Error: ",error);
    }
}

export default ConnectDB;