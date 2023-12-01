import { Cart } from "../models/Cart.js";
import { decodeToken } from "../utils/jwtUtils.js";

export const addToCart=async (req,res,next)=>{
    const token=req.cookies.access_token;
    const decoded_Token=await decodeToken(token,process.env.JWT);
    const {fruitId,cartTotal}=req.body;
    const id=decoded_Token.id;
    try{
        const cart=new Cart({fruitId,cartTotal,userId:id});
        await cart.save();
        res.status(201).json({message:'Cart added successfully.'});
    }catch(err){
        console.log(err.message);
        next(err);
    }
}

export const getCarts=async(req,res,next)=>{
    const token=req.cookies.access_token;
    const decoded_Token=await decodeToken(token,process.env.JWT);
    const userId=decoded_Token.id;
        try{
            if(userId){
                const cart=await Cart.find({userId:userId});
                if(!cart) return next(createError(404,'Fruit not found!'));
                res.status(200).json(cart);            
            }else{
                const carts=await Cart.find({});
                res.status(200).json(carts);     
            }
        }catch(err){
            console.error(err.message);
        }
}

export const deleteCart=async(req,res,next)=>{
    const cartId=req.params.id;
    if(cartId){
        try{
            const cart=await Cart.findByIdAndDelete(cartId);
            if(!cart) return next(createError(404,'Cart not found!'));
            res.status(200).json({ message: 'Cart deleted successfully.' });
        }catch(err){    
            console.error(err.message);
            next(err);
        }
    }
}

export const updateCart=async(req,res,next)=>{
    const {...updatedCart}=req.body;
    const cartId=req.params.id;
    try{
        if(cartId){
            const editedCart=await Cart.findByIdAndUpdate(cartId,updatedCart);
            if(editedCart) res.status(204).send();
        }
    }catch(err){    
        console.error(err.message);
        next(err);
    }
}