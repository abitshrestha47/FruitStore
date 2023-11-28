import { Category } from "../models/Category.js";
import { createError } from "../utils/error.js";

export const addCategory=async(req,res,next)=>{
    const {categoryName,categoryDescription}=req.body;
    const categoryImage=req.file.filename;
    try{
        const category=new Category({categoryName,categoryDescription,categoryImage});
        await category.save();
        res.status(201).json({message:'Category added successfully.'});
    }catch(err){    
        console.error(err.message);
    }
}

export const getCategory=async(req,res,next)=>{
    const id=req.params.id;
    try{
        if(id){
            const category=await Category.findById(id);
            if(!category) return next(createError(404,'Category not found!'));
            res.status(200).json(category);
        }
        else{
            const categories=await Category.find({});
            res.status(200).json(categories);
        }
    }catch(err){
        console.error(err.message);
        next(err);
    }
}