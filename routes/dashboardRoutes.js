import express from 'express';
import { verifyAdmin } from '../utils/jwtUtils.js';

export const dashboardRouter=express.Router();

dashboardRouter.get('/fruit-dashboard',verifyAdmin,(req,res)=>{
    res.render('fruitDashboard.ejs');
}); 

dashboardRouter.get('/category-dashboard',verifyAdmin,(req,res)=>{
    res.render('categoryDashboard.ejs');
});