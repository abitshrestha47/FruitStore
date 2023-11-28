const fruitForm=document.getElementById('fruitForm');

const addFruits=async(e)=>{
    e.preventDefault();
    const fruitFormData=new FormData(fruitForm);
    try{
        const response=await fetch(`http://localhost:9000/fruits`,{
            method:'POST',
            body:fruitFormData,
        });
    }catch(err){
        console.error(err.message);
    }
};

fruitForm.addEventListener('submit',addFruits);