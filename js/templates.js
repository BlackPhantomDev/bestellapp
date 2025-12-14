function getDishTemplate(name, price, description, imgSrc, dishId) {
    return `
    
        <div class="dish">
            <div class="dish-img">
                <img src="${imgSrc}" alt="">
            </div>
            <div class="dish-info">
                <h3>${name}</h3><h4>${price} CHF</h4>
                <p>${description}</p>
                <button id="add_dish" onclick="addDishToBasket();">Zum Warenkorb hinzufügen</button>
            </div>
        </div>

    `;
}

function getCartBasketTemplate() {
    return `
     <div id="cart_basket">
        <div id="cart_content">
            <h3>Warenkorb</h3>
            <button id="close_cart_basket" onclick="closeBasket()">X</button>
            <div class="cart-items">
            
                <div class="cart-item">
                
                    <div class="cart-item-counter">
                        <button class="basket-btn">-</button>
                        <span id="amount_{id}">1x</span>
                        <button class="basket-btn">+</button>
                    </div>
                    
                    <span class="item-name">Pizza</span>
                    
                    </div>
                
                </div>
            </div>
        <button id="checkout_btn">Zum Checkout</button>
    </div>
    `;
}