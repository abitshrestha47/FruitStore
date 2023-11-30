import express from 'express';
import { addFruits,editFruit,getFruits,deleteFruit } from '../controllers/fruitController.js';
import { upload } from '../utils/multerConfig.js';

export const fruitRouter=express.Router();

fruitRouter.post('/fruits',upload.single('fruitImage'),addFruits);
fruitRouter.patch('/fruits/:id',upload.single('fruitImage'),editFruit);
fruitRouter.get('/fruits',getFruits);
fruitRouter.delete('/fruits/:id',deleteFruit);