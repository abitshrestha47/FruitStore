const loginForm=document.getElementById('loginForm');
const email=document.getElementById('email');
const password=document.getElementById('password');
const error=document.getElementById('error');

const clearError=()=>{
    error.textContent='';
}

email.addEventListener('input',clearError);
password.addEventListener('input',clearError);

const submitForm=async(e)=>{
    e.preventDefault();
    try{
        const response=await fetch(`http://localhost:9000/login`,{
            method:'POST',
            body:JSON.stringify({
                'email':email.value,
                'password':password.value,
            }),
            headers:{'Content-Type':'application/json'},
        });
        const responseData=await response.json();
        if(response.status===404){
            error.textContent=responseData.error.message;
        }else if(response.status===400){
            error.textContent=responseData.error.message;
        }else if(response.ok){
            window.location.href='/';
        }
    }catch(err){    
        console.log(err.message);
    }
};

loginForm.addEventListener('submit', submitForm);