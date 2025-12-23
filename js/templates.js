function getDishTemplate(name, price, description, imgSrc, dishId) {
    return `
        <div class="dish">
            <div class="dish-img">
                <img src="${imgSrc}" alt="">
            </div>
            <div class="dish-info">
                <h3>${name}</h3><h4>${price} CHF</h4>
                <p>${description}</p>
                <button id="add_dish" onclick="addDishToBasket(${dishId});">Zum Warenkorb hinzufügen</button>
            </div>
        </div>

    `;
}

function getCartBasketTemplate() {
    return `
     <div id="cart_basket">
        <h3>Warenkorb</h3>
        <div id="cart_content">
            <button id="close_cart_basket" onclick="closeBasket()">X</button>
            <div id="empty_cart">
                <h5>Warenkorb ist leer</h5>
            </div>
            <div id="cart_table_wrapper">
                <div id="cart_table">
                    
                </div>
            </div>
        </div>
        <div id="checkout">
            <div id="price_switch_section">
                <div id="delivery_switch">
                    <img src="./assets/icons/pickup.png" alt="Abhol Symbol">
                    <label class="switch">
                        <input id="switch" type="checkbox">
                        <span class="slider round"></span>
                    </label>
                    <img src="./assets/icons/delivery.png" alt="Liefern Symbol">
                </div>
                <div id="total_price">
                    <span>Lieferkosten: ${deliveryPrice.toFixed(2)} CHF</span>
                    <h4>Total: <span>${totalPrice.toFixed(2)} CHF</span></h4>
                </div>
            </div>
            <div id="cart_btns_container">
                <button class="cart_btn" id="checkout_btn">Zum Checkout</button>
                <button class="cart_btn" id="clear_cart_btn" onclick="clearCart()">Warenkorb leeren</button>
            </div>
        </div>
    </div>
    `;
}

function getNewCartItem(id, name, amount, basePrice) {
    let displayedPrice = basePrice * amount;
    return `
        <div class="cart-table-item">
            <div class="item-name-price">
                <span>${name}</span><span>${displayedPrice.toFixed(2)} CHF</span>
            </div>
            <div class="item-counter">
                <button class="basket-btn" onclick="changeAmount(${id}, 'remove')">-</button>
                <span id="amount">${amount}x</span>
                <button class="basket-btn" onclick="changeAmount(${id}, 'add')">+</button>
            </div>
        </div>
    `;
}