
const cartTbody=document.getElementById('cartTbody');
const intitialValuesMap=new Map();
const getCarts=async()=>{
    return new Promise(async(resolve)=>{
        try{
            const response=await fetch(`http://localhost:9000/carts`);
            const cartData=await response.json();
            const promises=cartData.map(async(cart)=>{
                const tr=document.createElement('tr');
                const fruitImageCell=document.createElement('td');
                const fruitNameCell=document.createElement('td');
                const fruitPriceCell=document.createElement('td');
                const fruitDescriptionCell=document.createElement('td');
                const fruitQuantityCell=document.createElement('td');
                const fruitTotalCell=document.createElement('td');
                const actionCell=document.createElement('td');
                const removeButton=document.createElement('button');
                if(cart.fruitId){
                    const fruitData=await getFruits(cart.fruitId);
    
                    const imageElement=document.createElement('img');
                    imageElement.src=`/assets/images/${fruitData.fruitImage}`;
                    imageElement.style.width='80px';
                    imageElement.style.height='80px';
                    fruitImageCell.appendChild(imageElement);
                    fruitNameCell.textContent=fruitData.fruitName;
                    fruitPriceCell.textContent=fruitData.fruitPrice;
                    fruitDescriptionCell.textContent=fruitData.fruitDescription;
                    const increaseBtn=document.createElement('button');
                    increaseBtn.textContent='+';
                    increaseBtn.addEventListener('click',increaseQuantity);
                    const quantitySpan=document.createElement('span');
                    quantitySpan.id='quantity';
                    quantitySpan.textContent=`${cart.cartQuantity}`;
                    const decreaseBtn=document.createElement('button');
                    decreaseBtn.textContent='-';
                    decreaseBtn.addEventListener('click',decreaseQuantity);
                    fruitQuantityCell.appendChild(increaseBtn);
                    fruitQuantityCell.appendChild(quantitySpan);
                    fruitQuantityCell.appendChild(decreaseBtn);
                    fruitTotalCell.textContent=cart.cartTotal;

                    intitialValuesMap.set(cart._id,{
                        quantity:cart.cartQuantity,
                        total:cart.cartTotal,
                    });
    
                    removeButton.classList.add('btn','btn-danger','removeButton');
                    removeButton.textContent='Remove';
                    removeButton.addEventListener('click',removeCart);
                    removeButton.setAttribute('data-cart-id',cart._id);
                }
    
                tr.appendChild(fruitImageCell);
                tr.appendChild(fruitNameCell);
                tr.appendChild(fruitDescriptionCell);
                tr.appendChild(fruitPriceCell); 
                tr.appendChild(fruitQuantityCell);
                tr.appendChild(fruitTotalCell);
                tr.appendChild(removeButton);
    
                cartTbody.appendChild(tr);
            });
            await Promise.all(promises);
            resolve();
            // console.log(cartData);
        }catch(err){
            console.error(err.message);
            resolve();
        }
    });
}


const getFruits=async(id)=>{
    try{
        if(id){
            const response=await fetch(`http://localhost:9000/fruits/${id}`);
            const fruitData=await response.json();
            return fruitData;
        }
    }catch(err){
        console.error(err.message);
    }
}

async function fetchDataAndRender(){
    await getCarts();
    updateWholeTotal(); 
}
fetchDataAndRender();
async function increaseQuantity(e){
    const td=e.target.closest('td');
    const tr=e.target.closest('tr');
    const quantityElement=td.querySelector('#quantity');
    var quantity=parseInt(quantityElement.innerText,10);
    quantityElement.innerText=quantity+1;
    await updateFruitTotal(tr,quantityElement);
    updateWholeTotal();
}

async function decreaseQuantity(e){
    const td=e.target.closest('td');
    const tr=e.target.closest('tr');
    const quantityElement=td.querySelector('#quantity');
    var quantity=parseInt(quantityElement.innerText,10);
    if(quantity>1){
        quantityElement.innerText=quantity-1;
    }
    await updateFruitTotal(tr,quantityElement);
     updateWholeTotal();
}

async function updateFruitTotal(tr,quantityElement){
    const fruitPriceCell=tr.querySelector('td:nth-child(4)').textContent;
    const price = parseFloat(fruitPriceCell.match(/\d+/)[0]);
    var quantity=parseInt(quantityElement.innerText,10);
    const fruitTotalCell=tr.querySelector('td:nth-child(6)');
    const total=price*quantity;
    fruitTotalCell.textContent='Rs. '+total.toFixed(2);
}

function updateWholeTotal(){
    const allRows=cartTbody.querySelectorAll('tr');
    let overallTotal=0;
    allRows.forEach((row)=>{
        const fruitTotalCell=row.querySelector('td:nth-child(6)').textContent;
        console.log(fruitTotalCell);
        const rowTotal=parseFloat(fruitTotalCell.match(/\d+/)[0]);
        overallTotal+=rowTotal;
    });
    
    const overallTotalElement=document.getElementById('overallTotal');
    overallTotalElement.textContent='Total Price: Rs. '+overallTotal.toFixed(2);
}

//update cart
const updateCartButton=document.getElementById('updateCart');
updateCartButton.addEventListener('click',async(e)=>{
    const allRows=cartTbody.querySelectorAll('tr');
    allRows.forEach(async(row)=>{
        const cartId=row.querySelector('.removeButton').getAttribute('data-cart-id');
        const quantityElement=row.querySelector('#quantity');
        const currentQuantity=parseInt(quantityElement.innerText,10);
        const currentTotal=parseFloat(row.querySelector('td:nth-child(6)').textContent.match(/\d+/)[0]).toFixed(2);

        const initialValues=intitialValuesMap.get(cartId);
        if(currentQuantity!==initialValues.quantity||currentTotal!==initialValues.total){
            updateCart(cartId,currentQuantity,currentTotal);
        }
    })
});
//end update cart

const updateCart=async(cartId,quantity,total)=>{
    try{
        const response=await fetch(`http://localhost:9000/carts/${cartId}`,{
            method:'PUT',
            body:JSON.stringify({
                cartQuantity:quantity,
                cartTotal:total,
            }),
            headers: { 'Content-Type': 'application/json' },
        });
    }catch (err) {
        console.log(err.message);
    }
}

//remove cart 
const removeCart=async(e)=>{
    const cartId=e.target.getAttribute('data-cart-id');
    try{
        const response=await fetch(`http://localhost:9000/carts/${cartId}`,{
            method:"DELETE",
        });
    }catch(err){
        console.log(err.message);
    }
};

//end remove cart



