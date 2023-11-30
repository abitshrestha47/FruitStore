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
             <img src="/assets/images/${fruit.fruitImage}" class="card-img-top" alt="${fruit.fruitName}" width='200' height='400'>
            <div class="card-body">
                <h5 class="card-title">${fruit.fruitName}</h5>
                <p class="card-text">${fruit.fruitDescription}</p>
                <div class="d-flex justify-content-between align-items-center">
                    <small class="text-muted">Price: ${fruit.fruitPrice}</small>
                    <button type="button" class="btn btn-sm btn-outline-primary">Add to Cart</button>
                </div>
            </div>
        </div>
        `
        fruitContainer.appendChild(fruitCard);
    });
}

addFruitsToPage();
