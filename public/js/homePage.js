const getFruits=async(id)=>{
    try{
        if(id){
            const response=await  fetch(`http://localhost:9000/fruits/${id}`);
            const fruitData=await response.json();
            return fruitData;
        }else{
            const response=await fetch(`http://localhost:9000/fruits`);
            const fruitData=await response.json();
            return fruitData;
        }
    }catch(err){
        console.error(err.message);
    }
}

const fruitContainer=document.getElementById('fruitContainer');
const addFruitsToPage=async()=>{
    const fruitData=await getFruits();
    fruitData.forEach((fruit)=>{
        const fruitCard=document.createElement('div');
        fruitCard.className=`col-md-4`;
        fruitCard.innerHTML=`
        <div class="card mb-4 shadow-sm">
             <img src="/assets/images/${fruit.fruitImage}" class="card-img-top" alt="${fruit.fruitName}" width='200' height='350' id="fruitImage">
            <div class="card-body">
                <h5 class="card-title" id="fruitName">${fruit.fruitName}</h5>
                <p class="card-text" id="fruitDescription">${fruit.fruitDescription}</p>
                <div class="d-flex justify-content-between align-items-center">
                    <small class="text-muted" id="fruitPrice">Price: ${fruit.fruitPrice}</small>
                    <button type="submit" class="btn btn-sm btn-outline-primary add-to-cart" id="add-to-cart" data-fruit-id="${fruit._id}">Add to Cart</button>
                </div>
            </div>
        </div>
        `;
        fruitContainer.appendChild(fruitCard);
    });
}

addFruitsToPage();

const addToCartHandler=async (id,fruitData)=>{
    const fruitPrice=fruitData.fruitPrice;
    const cartTotal=fruitPrice.replace(/perKg/g,'');
    try{
        const response=await fetch(`http://localhost:9000/carts`,{
            method:'POST',
            body:JSON.stringify({
                'fruitId':id,
                'cartTotal':cartTotal,
            }),
            headers:{'Content-Type':'application/json'},
        });
    }catch(err){
        console.log(err.message);
    }
}

fruitContainer.addEventListener('click',async(e)=>{
    const addToCartButton=e.target.closest('.add-to-cart');
    if(addToCartButton){
        const fruitId=addToCartButton.getAttribute('data-fruit-id');
        const fruitData=await getFruits(fruitId);
        addToCartHandler(fruitId,fruitData);
    }
})

