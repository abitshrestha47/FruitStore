import { fileURLToPath } from 'url';
import path from 'path';
import fs from 'fs';

//gets the path to the current file 
const __filename=fileURLToPath(import.meta.url);
//gets the path to the current dir extracting from current file
const __dirname=path.dirname(__filename);

export const unlinkImagePath=async (imageUnlink)=>{
    const imagePath=path.join(__dirname,'..','public','assets','images');
    const imagePath_img=path.join(imagePath,imageUnlink);
    fs.unlink(imagePath_img,(err)=>{
        if(err){
            console.log('Error',err.message);
        }
    })
}