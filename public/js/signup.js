const signupForm=document.getElementById('signupForm');
const username=document.getElementById('username');
const email=document.getElementById('email');
const password=document.getElementById('password');
const confirmPassword=document.getElementById('confirmPassword');
const error=document.getElementById('error');

const clearError=()=>{
    error.textContent='';
}

username.addEventListener('input',clearError);
email.addEventListener('input',clearError);
password.addEventListener('input',clearError);
confirmPassword.addEventListener('input',clearError);
const submitForm=async(e)=>{
    e.preventDefault();
    if(password.value!==confirmPassword.value){
        error.textContent='Password is not same!';
    }else{
        try{
            const response=await fetch(`http://localhost:9000/signup`,{
                method:'POST',
                body:JSON.stringify({
                    'username':username.value,
                    'email':email.value,
                    'password':password.value,
                }),
                headers:{'Content-Type':'application/json'},
            });
            const responseData=await response.json();
            if(response.status===409){
                error.textContent=responseData.error.message;
            }
        }catch(err){
            console.log(err.message);
        }
    }
}

signupForm.addEventListener('submit',submitForm);