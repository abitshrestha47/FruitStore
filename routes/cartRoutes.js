import express from 'express';
import { addToCart,getCarts,deleteCart,updateCart } from '../controllers/cartController.js';
import { verifyToken } from '../utils/jwtUtils.js';

export const cartRouter=express.Router();

cartRouter.get('/cartpage',verifyToken,(req,res)=>{
    res.render('cart.ejs');
});
cartRouter.get('/carts',verifyToken,getCarts);
cartRouter.get('/carts/:id',verifyToken,getCarts);
cartRouter.post('/carts',verifyToken,addToCart);
cartRouter.delete('/carts/:id',verifyToken,deleteCart);
cartRouter.put('/carts/:id',verifyToken,updateCart);