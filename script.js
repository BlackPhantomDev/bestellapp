let cartBasketWrapper = document.getElementById('cart_basket_wrapper');
let confirmMessage = document.getElementById('confirm_message');
let menue = document.getElementById('menue');
let body = document.getElementsByTagName('body')[0];

// saves the id and the amount
// of the dish whos added to cart 
let cartItemId = [];
let cartItemAmount = [];
let totalPrice = 0;
let deliveryPrice = 0;
let deliverySwitchStatus = false;


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
    totalPrice = calculateTotalPrice();
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
    setupDeliverySwitchListener();
    saveToLocalStorage();
}

// sets up the event listener for the delivery switch
// only once, if not already added
// updates deliveryPrice and deliverySwitchStatus on change
// recalculates totalPrice and re-renders the cart
function setupDeliverySwitchListener() {
    let deliverySwitch = document.getElementById('switch');

    if (deliverySwitch && !deliverySwitch.hasAttribute('data-listener-added')) {
        deliverySwitch.addEventListener('change', function() {
            deliveryPrice = deliverySwitch.checked ? 5.9 : 0;
            deliverySwitchStatus = deliverySwitch.checked ? true : false;
            totalPrice = calculateTotalPrice();            
            renderCartBasket();
        });
        deliverySwitch.setAttribute('data-listener-added', 'true');
        deliverySwitch.checked = deliverySwitchStatus;
        deliveryPrice = deliverySwitch.checked ? 5.9 : 0;
        totalPrice = calculateTotalPrice();            
    }
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

// removes or add 1 from the amount
function changeAmount(id, actionValue) {
    let cartItemIndex = cartItemId.indexOf(id);
        
    if (actionValue == "remove") {
        if (cartItemAmount[cartItemIndex] > 1) {
            cartItemAmount[cartItemIndex] -= 1;
        } else {
            removeDishFromBasket(cartItemIndex); 
        }
    } else if (actionValue == "add") {
        cartItemAmount[cartItemIndex] += 1;
    }
    totalPrice = calculateTotalPrice();
    renderCartBasket();    
}

// calculates the total price 
function calculateTotalPrice() {
    let total = 0;
    for (let i = 0; i < cartItemId.length; i++) {
        const dish = dishes[cartItemId[i]];
        total += dish.price * cartItemAmount[i];
    }
    if (cartItemId.length > 0) {
        total += deliveryPrice;
    } else {
        total = deliveryPrice;
    }
    return total;
}

// remove an item from cart if amount 
// is already by 1 and still remove 1
function removeDishFromBasket(itemIndex) {
    cartItemId.splice(itemIndex, 1);
    cartItemAmount.splice(itemIndex, 1);
    totalPrice = calculateTotalPrice();
    renderCartBasket();
}

// clears cart; resets all arrays and price
function clearCart() {
    cartItemId = [];
    cartItemAmount = [];
    totalPrice = calculateTotalPrice();
    renderCartBasket(); 
    saveToLocalStorage();
}

// saves the arrays to localstorage
function saveToLocalStorage() {
    localStorage.setItem("cartItemId", JSON.stringify(cartItemId));
    localStorage.setItem("cartItemAmount", JSON.stringify(cartItemAmount));
    localStorage.setItem("deliverySwitchStatus", JSON.stringify(deliverySwitchStatus));
}

// loads arrays from localstorage to array
function getFromLocalStorage() {
    cartItemId = [];
    cartItemAmount = [];
    deliverySwitchStatus = false;

    let localStorageCartItemId = localStorage.getItem("cartItemId");
    let localStorageCartItemAmount = localStorage.getItem("cartItemAmount");
    let localStorageDeliverySwitchStatus = localStorage.getItem("deliverySwitchStatus");

    if (localStorageCartItemId !== null && localStorageCartItemId !== '[]') {
        cartItemId = JSON.parse(localStorageCartItemId);
    }else if (localStorageCartItemAmount !== null && localStorageCartItemAmount !== '[]') {
        cartItemAmount = JSON.parse(localStorageCartItemAmount);
    }else if (localStorageDeliverySwitchStatus !== null && localStorageDeliverySwitchStatus !== '[]') {
        deliverySwitchStatus = JSON.parse(localStorageDeliverySwitchStatus);
    }

    if ((cartItemId && cartItemAmount) || deliverySwitchStatus) {
        totalPrice = calculateTotalPrice();
    }
}