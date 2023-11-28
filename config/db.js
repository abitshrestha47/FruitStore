import mongoose from 'mongoose';
export const connectDB=async()=>{
    try{
        await mongoose.connect(process.env.MONGODB_URI);
        console.log(`Connected to mongoDB`);
    }catch(err){
        console.log(err.message);
    }
}