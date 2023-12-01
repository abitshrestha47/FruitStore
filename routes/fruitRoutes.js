import express from 'express';
import { addFruits,editFruit,getFruits,deleteFruit } from '../controllers/fruitController.js';
import { upload } from '../utils/multerConfig.js';
import { verifyAdmin } from '../utils/jwtUtils.js';

export const fruitRouter=express.Router();

fruitRouter.post('/fruits',verifyAdmin,upload.single('fruitImage'),addFruits);
fruitRouter.patch('/fruits/:id',verifyAdmin,upload.single('fruitImage'),editFruit);
fruitRouter.get('/fruits',getFruits);
fruitRouter.get('/fruits/:id',getFruits);
fruitRouter.delete('/fruits/:id',verifyAdmin,deleteFruit);