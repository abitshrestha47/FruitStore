import express from 'express';
export const authRouter=express.Router();
import { authenticateUser, createUser } from '../controllers/authController.js';

authRouter.get('/signup',(req,res)=>{
    res.render('signup.ejs');
});

authRouter.post('/signup',createUser);

authRouter.get('/login',(req,res)=>{
    res.render('login.ejs');
});

authRouter.post('/login',authenticateUser);

authRouter.get('/dash',(req,res)=>{
    res.render('fruitsDash.ejs');
})