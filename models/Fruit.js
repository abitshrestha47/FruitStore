import mongoose from 'mongoose';

const fruitSchema=new mongoose.Schema({
    fruitName:{
        type:String,
        required:true,
    },
    fruitPrice:{
        type:String,
        required:true,
    },
    fruitQuantity:{
        type:Number,
        required:true,
    },
    fruitDescription:{
        type:String,
        required:true,
    },
    fruitCategory:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Category',
        required:true,
    },
    fruitImage:{
        type:String,
        required:true,
    },
});

export const Fruit=mongoose.model('Fruit',fruitSchema);