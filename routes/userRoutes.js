import express from 'express';
import { decodeToken, verifyToken } from '../utils/jwtUtils.js';
// import { getUser } from '../controllers/authController.js';
export const userRouter=express.Router();

userRouter.get('/',async(req,res)=>{
    const token=req.cookies.access_token;
    res.render('homePage.ejs',{token});
});

// userRouter.get('/users/:id',verifyToken,getUser);

userRouter.get('/logout',async(req,res)=>{
    res.clearCookie('access_token');
    res.redirect('/');
});