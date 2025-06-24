import mongoose from "mongoose"

const DatabaseConnect = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI!)
        console.log("Databse connected successfully")
    } catch (error) {
        console.error(`Error connecting: ${error}`)
    }
}

export default DatabaseConnect