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
        <div id="cart_content">
            <h3>Warenkorb</h3>
            <button id="close_cart_basket" onclick="closeBasket()">X</button>
            <div id="empty_cart">
                <h5>Warenkorb ist leer</h5>
            </div>
            <table class="cart-table">
                <thead>
                    <tr>
                        <th class="cart-dish-name">Artikel</th>
                        <th class="cart-item-counter">Menge</th>
                        <th class="cart-price-tag">Preis</th>
                    </tr>
                </thead>
                <tbody id="cart_table_content">
                    
                </tbody>
                </table>
        </div>
        <div id="checkout">
            <span>Versand: 5.90 CHF</span><h4>Total: <span>${totalPrice.toFixed(2)} CHF</span></h4>
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
        <tr>
            <td class="cart-dish-name">${name}</td>
            <td class="cart-item-counter">
                <button class="basket-btn" onclick="changeAmount(${id}, 'remove')">-</button>
                <span id="amount">${amount}x</span>
                <button class="basket-btn" onclick="changeAmount(${id}, 'add')">+</button>
            </td>
            <td class="cart-price-tag">${displayedPrice.toFixed(2)} CHF</td>
        </tr>
    `;
}