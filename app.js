import express from 'express';
import 'dotenv/config.js';
import { fileURLToPath } from 'url';
import path from 'path';
import { connectDB } from './config/db.js';
import { authRouter } from './routes/authRoutes.js';
import { fruitRouter } from './routes/fruitRoutes.js';
import { dashboardRouter } from './routes/dashboardRoutes.js';
import { categoryRouter } from './routes/categoryRoutes.js';
import { userRouter } from './routes/userRoutes.js';
import { cartRouter } from './routes/cartRoutes.js';
import cookieParser from 'cookie-parser';
const app=express();

connectDB();

//get the current file location 
const __filename=fileURLToPath(import.meta.url);
//get the directory name 
const __dirname=path.dirname(__filename);

//to set the view engine as ejs 
app.set('view engine','ejs');
//to locate the view folder
app.set('views',path.join(__dirname,'views'));
app.use(express.json());
app.use(express.static(path.resolve(__dirname,'public')));
app.use(cookieParser());

app.use('/',authRouter);
app.use('/',fruitRouter);
app.use('/',dashboardRouter);
app.use('/',categoryRouter);
app.use('/',userRouter);
app.use('/',cartRouter);

app.use((err,req,res,next)=>{
    res.status(err.status || 500).json({
        error:{
            status:err.status || 500,
            message:err.message || 'Internal Server Error'
        }
    });
});
app.listen(9000,()=>{
    console.log(`listening on http://localhost:9000`);
});