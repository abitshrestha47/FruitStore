import express from 'express';

export const dashboardRouter=express.Router();

dashboardRouter.get('/fruit-dashboard',(req,res)=>{
    res.render('fruitDashboard.ejs');
}); 

dashboardRouter.get('/category-dashboard',(req,res)=>{
    res.render('categoryDashboard.ejs');
});