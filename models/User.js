import mongoose from 'mongoose';

const userSchema=new mongoose.Schema({
    username:{
        type:String,
        required:true,
    },
    email:{
        type:String,
        required:true,
        unqiue:true,
    },
    password:{
        type:String,
        required:true,
    },
    role:{
        type:Number,
        enum:[0,1],//0=>admin,1=>user
        default:1,
    }
});

export const User=mongoose.model('User',userSchema);