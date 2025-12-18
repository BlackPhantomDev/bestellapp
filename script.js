let cartBasketWrapper = document.getElementById('cart_basket_wrapper');
let confirmMessage = document.getElementById('confirm_message');
let menue = document.getElementById('menue');
let body = document.getElementsByTagName('body')[0];

// saves the id and the amount
// of the dish whos added to cart 
let cartItemId = [];
let cartItemAmount = [];


function init() {
    getFromLocalStorage();
    renderDishes();
    renderCartBasket();
}

// when clicked on open basket btn
// render the cart basket and then show basket wrapper
// prevent scrolling of body when basket open
function toggleOpenBasket() {
    renderCartBasket();
    cartBasketWrapper.classList.toggle('visible');
    if (body.style.overflow != "hidden") {
        body.style.overflow = "hidden";
    } else {
        body.style.overflow = "auto";
    }
}

// hide basket wrapper
// let scroll body again
function closeBasket() {
    cartBasketWrapper.classList.remove('visible');
    body.style.overflow = "auto";
}

// when clicked "add to cart"
// shows confirm message
// checks if dish aleready is in array
// if in array, count amount up
// render cart again
function addDishToBasket(index) {
    showConfirmMessage();
    const dish = dishes[index];
    let cartItemIndex;
    
    if (cartItemId.includes(dish.id)) {
        cartItemIndex = cartItemId.indexOf(dish.id);
        cartItemAmount[cartItemIndex] += 1;        
    } else {
        cartItemId.push(dish.id);
        cartItemAmount.push(1);
    }
    
    renderCartBasket();    
}

// shows message, after 5sec hide message
function showConfirmMessage() {
    confirmMessage.classList.add('visible');
    setTimeout(() => {
        confirmMessage.classList.remove('visible');
    }, 5000);
}

// render dishes in menue container -> 
// with template and infos from dishes.js
function renderDishes() {
    for (let index = 0; index < dishes.length; index++) {
        const dish = dishes[index];

        menue.innerHTML += getDishTemplate(
            dish.name,
            dish.price,
            dish.description,
            dish.imgSrc,
            dish.id
        );
    }
}

// render cart content 
// checks if items already in list
// if in list render every of them
// if not set default message
function renderCartBasket() {
    cartBasketWrapper.innerHTML = getCartBasketTemplate();
    let emptyCart = document.getElementById('empty_cart');
    let cartTableContent = document.getElementById('cart_table_content');
    let cartTable = document.getElementsByClassName('cart-table')[0];

    if (cartItemId.length != 0) {
        isCartEmpty(emptyCart, cartTable, false);
        for (let i = 0; i < cartItemId.length; i++) {
            const dish = dishes[cartItemId[i]];
            cartTableContent.innerHTML += getNewCartItem(dish.id, dish.name, cartItemAmount[i], dish.price);
        }
    } else {
        isCartEmpty(emptyCart, cartTable, true);
    }
    saveToLocalStorage();
}

// this function sets the visibility of the content
// and the not avaiable message
function isCartEmpty(emptyCart, cartTable, isEmpty) {
    if (isEmpty) {
        emptyCart.style.display = 'block';
        cartTable.style.display = 'none';
    } else {
        emptyCart.style.display = 'none';
        cartTable.style.display = 'table';
    }
}

// removes 1 from the amount
function removeAmount(id) {
    
}

// add 1 to the amount
function addAmount(id) {
    
}

// saves the arrays to localstorage
function saveToLocalStorage() {
    localStorage.setItem("cartItemId", JSON.stringify(cartItemId));
    localStorage.setItem("cartItemAmount", JSON.stringify(cartItemAmount));
}

// loads arrays from localstorage to array
function getFromLocalStorage() {
    cartItemId = [];
    cartItemAmount = [];

    let localStorageCartItemId = localStorage.getItem("cartItemId");
    let localStorageCartItemAmount = localStorage.getItem("cartItemAmount");

    cartItemId = JSON.parse(localStorageCartItemId);

    cartItemAmount = JSON.parse(localStorageCartItemAmount);
}