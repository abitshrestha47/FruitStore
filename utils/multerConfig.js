import multer from "multer";

const storageEngine=multer.diskStorage({
    destination:'./public/assets/images',
    filename:(req,file,cb)=>{
        cb(null,`${Date.now()}--${file.originalname}`);
    },
});

export const upload=multer({
    storage:storageEngine,
});