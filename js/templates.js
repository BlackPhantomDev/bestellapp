function getDishTemplate(name, price, description, imgSrc, dishId, category) {
    return `
        <div class="dish" id="${category}">
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

function getDesktopCartBasketTemplate() {
    return `
        <div id="desktop_cart_basket">
            <h3>Warenkorb</h3>
            <div id="desktop_cart_content">
                <div id="desktop_empty_cart">
                    <h5>Warenkorb ist leer</h5>
                </div>
                <div id="cart_table_wrapper">
                    <div id="desktop_cart_table">
                        
                    </div>
                </div>
            </div>
            <div id="desktop_checkout">
                <div id="price_switch_section">
                    <div id="delivery_switch">
                        <img src="./assets/icons/pickup.png" alt="Abhol Symbol">
                        <label class="switch">
                            <input id="switch-desktop" type="checkbox">
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
                    <button class="cart_btn" id="clear_cart_btn" onclick="clearCart(2)">Warenkorb leeren</button>
                    <button class="cart_btn" id="checkout_btn" onclick="checkout()">Jetzt Bestellen</button>
                </div>
            </div>
        </div>
    `;
}

function getMobileCartBasketTemplate() {
    return `
     <div id="cart_basket">
        <h3>Warenkorb</h3>
        <div id="cart_content">
                <button onclick="closeBasket()" id="close_cart_basket" class="close-btn" type="button" tabindex="0">
                    <img src="./assets/icons/close-icon.png" alt="Schliessen Button"/>
                </button>
            <div id="empty_cart">
                <h5>Warenkorb ist leer</h5>
            </div>
            <div id="cart_table_wrapper">
                <div id="mobile_cart_table">
                    
                </div>
            </div>
        </div>
        <div id="checkout">
            <div id="price_switch_section">
                <div id="delivery_switch">
                    <img src="./assets/icons/pickup.png" alt="Abhol Symbol">
                    <label class="switch">
                        <input id="switch-mobile" type="checkbox">
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
                <button class="cart_btn" id="checkout_btn" onclick="checkout()">Jetzt Bestellen</button>
                <button class="cart_btn" id="clear_cart_btn" onclick="clearCart(2)">Warenkorb leeren</button>
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
            <div class="item-btns">
                <div class="item-counter">
                    <button class="basket-btn" onclick="changeAmount(${id}, 'remove')">-</button>
                    <span id="amount">${amount}x</span>
                    <button class="basket-btn" onclick="changeAmount(${id}, 'add')">+</button>
                </div>
                <button class="basket-btn" onclick="removeDishFromBasket(${id})">
                    <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" viewBox="0,0,256,256">
                        <g fill="none" fill-rule="nonzero" stroke="none" stroke-width="1" stroke-linecap="butt" stroke-linejoin="miter" stroke-miterlimit="10" stroke-dasharray="" stroke-dashoffset="0" font-family="none" font-weight="none" font-size="none" text-anchor="none" style="mix-blend-mode: normal"><g transform="scale(2,2)"><path d="M84,124h-40c-11.05,0 -20,-8.95 -20,-20v-66h80v66c0,11.05 -8.95,20 -20,20z" fill="#ffffff"></path><path d="M104,38h-80c-5.52,0 -10,-4.48 -10,-10v0c0,-5.52 4.48,-10 10,-10h80c5.52,0 10,4.48 10,10v0c0,5.52 -4.48,10 -10,10z" fill="#ffffff"></path><path d="M117,28c0,-7.17 -5.83,-13 -13,-13h-80c-7.17,0 -13,5.83 -13,13c0,7.17 5.83,13 13,13h77v63c0,9.37 -7.63,17 -17,17h-40c-9.37,0 -17,-7.63 -17,-17v-52c0,-1.66 -1.34,-3 -3,-3c-1.66,0 -3,1.34 -3,3v52c0,12.68 10.32,23 23,23h40c12.68,0 23,-10.32 23,-23v-63.36c5.72,-1.36 10,-6.51 10,-12.64zM104,35h-80c-3.86,0 -7,-3.14 -7,-7c0,-3.86 3.14,-7 7,-7h80c3.86,0 7,3.14 7,7c0,3.86 -3.14,7 -7,7z" fill="#000000"></path><path d="M79,7h-30c-1.66,0 -3,-1.34 -3,-3c0,-1.66 1.34,-3 3,-3h30c1.66,0 3,1.34 3,3c0,1.66 -1.34,3 -3,3z" fill="#000000"></path><path d="M50,107c-1.66,0 -3,-1.34 -3,-3v-46c0,-1.66 1.34,-3 3,-3c1.66,0 3,1.34 3,3v46c0,1.66 -1.34,3 -3,3z" fill="#000000"></path><path d="M78,107c-1.66,0 -3,-1.34 -3,-3v-46c0,-1.66 1.34,-3 3,-3c1.66,0 3,1.34 3,3v46c0,1.66 -1.34,3 -3,3z" fill="#000000"></path></g></g>
                    </svg>
                </button>
            </div>
        </div>
    `;
}