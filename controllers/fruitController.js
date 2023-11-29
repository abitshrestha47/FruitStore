import { Fruit } from "../models/Fruit.js";

export const addFruits=async(req,res,next)=>{
    const {fruitName,fruitPrice,fruitQuantity,fruitDescription,fruitCategory}=req.body;
    const fruitImage=req.file.filename;
    try{
        const fruit=new Fruit({fruitName,fruitPrice,fruitQuantity,fruitDescription,fruitCategory,fruitImage});
        await fruit.save();
        res.status(201).json({message:"Fruit added successfully"});
    }catch(err){
        console.log(err.message);
    }
}

export const getFruits=async(req,res,next)=>{
    const id=req.params.id;
    try{
        if(id){
            const fruit=await Fruit.findById(id);
            if(!fruit) return next(createError(404,'Fruit not found!'));
            res.status(200).json(fruit);
        }else{
            const fruits=await Fruit.find({});
            res.status(200).json(fruits);
        }
    }catch(err){
        console.error(err.message);
        next(err); 
    }
}

