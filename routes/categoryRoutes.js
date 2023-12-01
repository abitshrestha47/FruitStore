import express from 'express';
import { upload } from '../utils/multerConfig.js';
import { addCategory, getCategory,editCategory, deleteCategory} from '../controllers/categoryController.js';
import { verifyAdmin } from '../utils/jwtUtils.js';
export const categoryRouter=express.Router();

categoryRouter.post('/category',verifyAdmin,upload.single('categoryImage'),addCategory);
categoryRouter.get('/category',getCategory);
categoryRouter.get('/category/:id',getCategory);
categoryRouter.patch('/category/:id',verifyAdmin,upload.single('categoryImage'),editCategory);
categoryRouter.delete('/category/:id',verifyAdmin,deleteCategory);