import bcrypt from 'bcrypt';
const saltRounds=10;

export const hashPassword=async(plainText)=>{
    try{
        const hash=await bcrypt.hash(plainText,saltRounds);
        return hash;
    }catch(err){
        console.error(err.message);
    }
}

export const compareHash=async(plainText,hash)=>{
    try{
        const valid=await bcrypt.compare(plainText,hash.password);
        return valid;
    }catch(err){
        console.log(err.message);
    }
}