document.addEventListener("DOMContentLoaded", () => {

    const productList = document.getElementById('product-list');
    const cartItems = document.getElementById('cart-items');
    const emptyCart = document.getElementById('empty-cart');
    const cartTotalMsg = document.getElementById('checkout');
    const totalPrizeMsg = document.getElementById('total-prize');   
    const checkoutBtn = document.getElementById('checkout-btn');
    const removeBtn = document.getElementById('remove-btn');
    const removeDiv = document.getElementById('remove');

    const products = [
        {  id : 1, name : "Product 1", price : 29.99},
        {  id : 2, name : "Product 2", price : 19.99},
        {  id : 3, name : "Product 3", price : 49.99},
    ];

    const cart = [];


    products.forEach((product) => {
       const productDiv =  document.createElement("div");
       productDiv.classList.add("product");
       productDiv.innerHTML = `
        <section>
                    <p>${product.name} - $${product.price.toFixed(2)}</p>
                    <button data-id="${product.id}">Add to Cart</button>
         </section>
       `;
       productList.appendChild(productDiv);
    });

        productList.addEventListener('click', (event) => {
            if(event.target.tagName === "BUTTON"){
               const productId = parseInt(event.target.getAttribute("data-id"));
               const product = products.find(p => p.id === productId);
               addToCart(product);
            }

            function addToCart(product){
                cart.push(product);
                renderCart();
            }
    });

    function renderCart(){
        cartItems.innerHTML = "";
        let totalPrize = 0;

        if(cart.length > 0){
            emptyCart.classList.add('hidden');
            cartTotalMsg.classList.remove('hidden');
            removeDiv.classList.remove('hidden');
            removeDiv.classList.add('position');
            cart.forEach((item , index) => {
                totalPrize += item.price;
                const cartItem = document.createElement('div');
                cartItem.innerHTML = `
                ${item.name} : $${item.price.toFixed(2)}
                `;
                cartItems.appendChild(cartItem);

                totalPrizeMsg.innerText = `$${totalPrize.toFixed(2)}`;
            });
        }else{
            emptyCart.classList.remove('hidden');
            totalPrizeMsg.innerText = `$0.00`;
        }
    };

    checkoutBtn.addEventListener('click',() => {
        cart.length = 0
        alert("Thanks for coming...");
        renderCart();
    });

    removeBtn.addEventListener('click' , () => {
        cartItems.classList.add('hidden');
        let lastPrize = renderCart.totalPrize;
        console.log(lastPrize);
        cart.forEach((item , index) => {
            lastPrize -= item.price;
        });
        totalPrizeMsg.innerText = `$${lastPrize.toFixed(2)}`;
        renderCart();
    })

}); // DOM End