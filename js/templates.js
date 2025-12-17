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
                        <th>Menge</th>
                        <th>Artikel</th>
                        <th>Preis</th>
                    </tr>
                </thead>
                <tbody id="cart_table_content">
                    
                </tbody>
            </table>
            <h4>Total:</h4>
        </div>
        <button id="checkout_btn">Zum Checkout</button>
    </div>
    `;
}

function getNewCartItem(id, name, amount, basePrice) {
    let displayedPrice = basePrice * amount;
    return `
        <tr>
            <td class="cart-item-counter">
                <button class="basket-btn" onclick="removeAmount(${id})">-</button>
                <span>${amount}x</span>
                <button class="basket-btn" onclick="addAmount(${id})">+</button>
            </td>
            <td class="item-name">${name}</td>
            <td>${displayedPrice.toFixed(2)} CHF</td>
        </tr>
    `;
}