import mongoose from "mongoose"

export const connectMongo = async () => {
    try {
        const {connection} = await mongoose.connect(process.env.MONGODB_URI as string)
        if(connection.readyState === 1){
            return Promise.resolve(true)
        }
    } catch (error) {
        return Promise.reject(error)
    }
}