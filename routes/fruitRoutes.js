import express from 'express';
import { addFruits,getFruits } from '../controllers/fruitController.js';
import { upload } from '../utils/multerConfig.js';

export const fruitRouter=express.Router();

fruitRouter.post('/fruits',upload.single('fruitImage'),addFruits);
fruitRouter.get('/fruits',getFruits);