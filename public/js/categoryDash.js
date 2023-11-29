
const categoryForm=document.getElementById('categoryForm');

const addCategory=async(e)=>{
    e.preventDefault();
    const categoryFormData=new FormData(categoryForm);
    try{  
        const response=await fetch(`http://localhost:9000/category`,{
            method:'POST',
           body:categoryFormData,
        });
        if(response.status===201){
        }
    }catch(err){
        console.log(err.message);
    }
}

categoryForm.addEventListener('submit',addCategory);

const categoryTbody=document.getElementById('categoryTbody');

const getCategory=async()=>{
    try{
        const response=await fetch(`http://localhost:9000/category`);
        const categoryData=await response.json();
        categoryData.forEach((category)=>{
            const tr=document.createElement('tr');
            const nameCell=document.createElement('td');
            const descriptionCell=document.createElement('td');
            const imageCell=document.createElement('td');
            const actionCell=document.createElement('td');

            nameCell.textContent=category.categoryName;
            descriptionCell.textContent=category.categoryDescription;
            const imageElement=document.createElement('img');
            imageElement.style.width='90px';
            imageElement.style.height='90px';
            imageElement.src=`http://localhost:9000/assets/images/${category.categoryImage}`;
            imageCell.appendChild(imageElement);

            const editButton=document.createElement('button');
            editButton.textContent='Edit';
            editButton.setAttribute('data-bs-toggle','modal');
            editButton.setAttribute('data-bs-target','#exampleModal');
            editButton.classList.add('btn','btn-primary');
            editButton.setAttribute('data-category-id',category._id);
            editButton.addEventListener('click',editCategory);

            const deleteButton=document.createElement('button');
            deleteButton.textContent='Delete';
            deleteButton.classList.add('btn','btn-danger');
            deleteButton.setAttribute('data-category-id',category._id);
            deleteButton.addEventListener('click',deleteCategory);

            actionCell.appendChild(editButton);
            actionCell.appendChild(deleteButton);

            tr.appendChild(nameCell);
            tr.appendChild(descriptionCell);
            tr.appendChild(imageCell);
            tr.appendChild(actionCell);

            categoryTbody.appendChild(tr);
        });
    }catch(err){    
        console.log(err.message);
    }
}

getCategory();

const editInputCategoryName=document.getElementById('editCategoryName');
const editInputCategoryDescription=document.getElementById('editCategoryDescription');
const editInputCategoryImage=document.getElementById('editCategoryImage');
const dbStoredImage=document.getElementById('dbStoredImage');

const editCategory=async(e)=>{
    e.preventDefault();
    const tr=e.target.closest('tr');
    const categoryId=e.target.getAttribute('data-category-id')
    console.log(tr);
    const categoryName=tr.querySelector('td:nth-child(1)').textContent;
    const categoryDescription=tr.querySelector('td:nth-child(2)').textContent;
    const categoryImage=tr.querySelector('td:nth-child(3) img').src;

    const initialData={
        categoryName:categoryName,
        categoryDescription:categoryDescription,
        categoryImage:categoryImage,
    }

    editInputCategoryName.value=categoryName;
    editInputCategoryDescription.value=categoryDescription;
    dbStoredImage.src=categoryImage;

    editInputCategoryImage.addEventListener('change',(e)=>{
        const selectedFile=e.target.files[0];
        if(selectedFile){
            const objectURL=URL.createObjectURL(selectedFile);
            dbStoredImage.src=objectURL;
        }else{
            dbStoredImage.src=categoryImage;
        }
    });

    const editBtnSave=document.getElementById('editSaveBtn');
    editBtnSave.addEventListener('click',async(e)=>{
        e.preventDefault();
        const updatedData={
            categoryName:editInputCategoryName.value,
            categoryDescription:editInputCategoryDescription.value,
            categoryImage:dbStoredImage.src,
        };
        const editFormData=new FormData();
        for(const field in updatedData){
            if(updatedData[field]!==initialData[field]){
                if(field==='categoryName'){
                    editFormData.append('categoryName',updatedData[field]);
                }else if(field==='categoryDescription'){
                    editFormData.append('categoryDescription',updatedData[field]);
                }else if(field==='categoryImage'){
                    editFormData.append('categoryImage',editInputCategoryImage.files[0]);
                }
            }
        }
        try{
            const response=await fetch(`http://localhost:9000/category/${categoryId}`,{
                method:'PATCH',
                body:editFormData,
            });
            if(response.status===204){
            }
        }catch(err){
            console.error(err.message);
        }
        // for(const entry of editFormData.entries()){
        //     console.log(entry);
        // }
    });
}

const deleteCategory=async(e)=>{
    e.preventDefault();
    const categoryId=e.target.getAttribute('data-category-id');
    try{
        const response=await fetch(`http://localhost:9000/category/${categoryId}`,{
            method:'DELETE',
        });
    }catch(err){
        console.error(err.message);
    }
}