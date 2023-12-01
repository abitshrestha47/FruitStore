import jwt from 'jsonwebtoken';
import { createError } from './error.js';

export const verifyToken=(req,res,next)=>{
    const token=req.cookies.access_token;
    if(!token){
        return next(createError(401,'You are not authorized!'));
    }

    jwt.verify(token,process.env.JWT,(err,user)=>{
        if(err) return next(createError(401,'Token is not valid!'));
        req.user=user;
        next();
    });
};

export const verifyAdmin=(req,res,next)=>{
    verifyToken(req,res,()=>{
        if(req.user.role===0){
            next();
        }else{
            return next(createError(403,'You are not authorized!'));
        }
    });
};


export const decodeToken=async (token,SECRET_KEY)=>{
    return jwt.verify(token,SECRET_KEY);
}
