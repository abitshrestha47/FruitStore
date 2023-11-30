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

const selectElement=document.getElementById('fruitCategory');
const getCategory=async(id)=>{
    try{
        if(id){
            const response=await fetch(`http://localhost:9000/category/${id}`);
            const categoryData=await response.json();
            return categoryData;
        }else{    
            const response=await fetch(`http://localhost:9000/category`);
            const categoryData=await response.json();
            return categoryData;
        }
    }catch(err){
        console.error(err.message);
    }
}

const categorySelectFill=async ()=>{
    const categoryData=await getCategory();
    categoryData.forEach((category)=>{
        const categoryOption=document.createElement('option');
        categoryOption.value=category._id;
        categoryOption.textContent=category.categoryName;
        selectElement.appendChild(categoryOption);
    });
}

categorySelectFill();

const fruitTbody=document.getElementById('fruitTbody');
const getFruits=async()=>{
    try{
        const response=await fetch(`http://localhost:9000/fruits`);
        const fruitData=await response.json();
        fruitData.forEach(async (fruit)=>{
            const tr=document.createElement('tr');
            const fruitNameCell=document.createElement('td');
            const fruitPriceCell=document.createElement('td');
            const fruitQuantityCell=document.createElement('td');
            const fruitDescriptionCell=document.createElement('td');
            const fruitCategoryCell=document.createElement('td');
            const fruitImageCell=document.createElement('td');
            const actionCell=document.createElement('td');

            fruitNameCell.textContent=fruit.fruitName;
            fruitPriceCell.textContent=fruit.fruitPrice;
            fruitQuantityCell.textContent=fruit.fruitQuantity;
            fruitDescriptionCell.textContent=fruit.fruitDescription;
            const categoryData=await getCategory(fruit.fruitCategory);
            fruitCategoryCell.textContent=categoryData.categoryName;
            
            const imageElement=document.createElement('img');
            imageElement.src=`/assets/images/${fruit.fruitImage}`;
            imageElement.style.width='90px';
            imageElement.style.height='90px';
            fruitImageCell.appendChild(imageElement);

            const editButton=document.createElement('button');
            editButton.textContent='Edit';
            editButton.setAttribute('data-bs-toggle','modal');
            editButton.setAttribute('data-bs-target','#exampleModal');
            editButton.classList.add('btn','btn-primary');
            editButton.setAttribute('data-fruit-id',fruit._id);
            editButton.addEventListener('click',editFruit);

            const deleteButton=document.createElement('button');
            deleteButton.textContent='Delete';
            deleteButton.classList.add('btn','btn-danger');
            deleteButton.setAttribute('data-fruit-id',fruit._id);
            deleteButton.addEventListener('click',deleteFruit);

            actionCell.appendChild(editButton);
            actionCell.appendChild(deleteButton);

            tr.appendChild(fruitNameCell);
            tr.appendChild(fruitPriceCell);
            tr.appendChild(fruitQuantityCell);
            tr.appendChild(fruitDescriptionCell);
            tr.appendChild(fruitCategoryCell);
            tr.appendChild(fruitImageCell);
            tr.appendChild(actionCell);

            fruitTbody.appendChild(tr);
        });
    }catch(err){
        console.log(err.message);
    }
}

getFruits();


const fruitNameEdit=document.getElementById('editFruitName');
const fruitPriceEdit=document.getElementById('editFruitPrice');
const fruitQuantityEdit=document.getElementById('editFruitQuantity');
const fruitDescriptionEdit=document.getElementById('editFruitDescription');
const fruitCategoryEdit=document.getElementById('editFruitCategory');
const fruitImageEdit=document.getElementById('editFruitImage');
const fruitImageDisplay=document.getElementById('dbStoredImage');
const editSaveBtn=document.getElementById('editSaveBtn');

const editFruit=async(e)=>{
    e.preventDefault();
    const tr=e.target.closest('tr');
    const fruitId=e.target.getAttribute('data-fruit-id');
    const fruitName=tr.querySelector('td:nth-child(1)').textContent;
    const fruitPrice=tr.querySelector('td:nth-child(2)').textContent;
    const fruitQuantity=tr.querySelector('td:nth-child(3)').textContent;
    const fruitDescription=tr.querySelector('td:nth-child(4)').textContent;
    const fruitCategory=tr.querySelector('td:nth-child(5)').textContent;    
    const fruitImage=tr.querySelector('td:nth-child(6) img').src;

    const initialData={
        fruitName:fruitName,
        fruitPrice:fruitPrice,
        fruitQuantity:fruitQuantity,
        fruitDescription:fruitDescription,
        fruitCategory:fruitCategory,
        fruitImage:fruitImage,
    }

    fruitNameEdit.value=fruitName;
    fruitPriceEdit.value=fruitPrice;
    fruitQuantityEdit.value=fruitQuantity;
    fruitDescriptionEdit.value=fruitDescription;
    
    const categoryValues=await getCategory();
    categoryValues.forEach((category)=>{
        const editCategoryOption=document.createElement('option');
        editCategoryOption.value=category._id;
        editCategoryOption.textContent=category.categoryName;
        if(category.categoryName===fruitCategory){
            editCategoryOption.selected=true;
        }
        fruitCategoryEdit.appendChild(editCategoryOption);
    });
    fruitImageDisplay.src=fruitImage;

    fruitImageEdit.addEventListener('change',(e)=>{
        const selectedFile=e.target.files[0];
        if(selectedFile){
            const objectURL=URL.createObjectURL(selectedFile);
            fruitImageDisplay.src=objectURL;
        }else{
            fruitImageDisplay.src=fruitImage;
        }
    })

    editSaveBtn.addEventListener('click',async(e)=>{
        e.preventDefault();
        const selectedCategoryOption = fruitCategoryEdit.options[fruitCategoryEdit.selectedIndex];
        const fruitCategory = selectedCategoryOption ? selectedCategoryOption.textContent : '';
        const updatedData={
            fruitName:fruitNameEdit.value,
            fruitPrice:fruitPriceEdit.value,
            fruitQuantity:fruitQuantityEdit.value,
            fruitDescription:fruitDescriptionEdit.value,
            fruitCategory:fruitCategory,
            fruitImage:fruitImageDisplay.src,
        }
        const editFruitData=new FormData();
        for(const field in updatedData){
            if(updatedData[field]!==initialData[field]){
                if(field==='fruitName'){
                    editFruitData.append('fruitName',updatedData[field]);
                }else if(field==='fruitPrice'){
                    editFruitData.append('fruitPrice',updatedData[field]);
                }
                else if(field==='fruitQuantity'){
                    editFruitData.append('fruitQuantity',updatedData[field]);
                }else if(field==='fruitDescription'){
                    editFruitData.append('fruitDescription',updatedData[field]);
                }else if(field==='fruitCategory'){
                    editFruitData.append('fruitCategory',fruitCategoryEdit.value);
                }else if(field==='fruitImage'){
                    editFruitData.append('fruitImage',fruitImageEdit.files[0]);
                }
            }
        }
        // for(const entry of editFruitData.entries()){
        //     console.log(entry);
        // }

        try{
            const response=await fetch(`http://localhost:9000/fruits/${fruitId}`,{
                method:'PATCH',
                body:editFruitData,
            });
            if(response.status===204){
            }
        }catch(err){
            console.error(err.message);
        }
    });
}

const deleteFruit=async(e)=>{
    e.preventDefault();
    const fruitId=e.target.getAttribute('data-fruit-id');
    try{
        const response=await fetch(`http://localhost:9000/fruits/${fruitId}`,{
            method:'DELETE',
        });
    }catch(err){
        console.error(err.message);
    }
}
