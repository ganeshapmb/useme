import mongoose from "mongoose";

const connectDb = async() =>{
    const mongoUri:any = process.env.MONGO_URI;
    if(mongoose.connections[0].readyState){
        
    }
    await mongoose.connect(mongoUri);
}
export default connectDb;