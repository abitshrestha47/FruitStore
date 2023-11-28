import express from 'express';
import { upload } from '../utils/multerConfig.js';
import { addCategory, getCategory } from '../controllers/categoryController.js';
export const categoryRouter=express.Router();

categoryRouter.post('/category',upload.single('categoryImage'),addCategory);
categoryRouter.get('/category',getCategory);