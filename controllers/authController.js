import { User } from "../models/User.js";
import { createError } from "../utils/error.js";
import { compareHash, hashPassword } from "../utils/passwordUtils.js";
import jwt from 'jsonwebtoken';

export const createUser=async(req,res,next)=>{
    const {username,email,password}=req.body;
    try{
        const emailTaken=await User.findOne({email});
        if(emailTaken) return next(createError(409,"Email already taken"));     
        const hashedPassword=await hashPassword(password);
        if(hashedPassword){
            const user=new User({username,email,password:hashedPassword});
            await user.save();
        }
        res.status(200).json({message:'Signup Complete.'});
    }catch(err){
        console.error(err.message);
    }
}

export const authenticateUser=async(req,res,next)=>{
    try{
        const user=await User.findOne({email:req.body.email});
        if(!user) return next(createError(404,"Email not found!"));
        const isPasswordValid=await compareHash(req.body.password,user);
        if(!isPasswordValid) return next(createError(400,'Wrong Password!'));
        const {password,role,...otherDetails}=user._doc;
        const token=jwt.sign({id:user._id,role:user.role},process.env.JWT);
        res.cookie('access_token',token,{
            httpOnly:true,
        }).status(200).json({...otherDetails});
    }catch(err){
        console.error(err.message);
    }
}