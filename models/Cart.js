import mongoose from 'mongoose';

const cartSchema=new mongoose.Schema({
    userId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User',
        required:true,
    },
    fruitId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Fruit',
        required:true, 
    },
    cartQuantity:{
        type:Number,
        default:1,
        required:true,
    },
    cartTotal:{
        type:String,
        required:true,
    },
});

export const Cart=mongoose.model('Cart',cartSchema);