const mobileCartBasketWrapper = document.getElementById('mobile_cart_basket_wrapper');
const desktopCartBasketWrapper = document.getElementById('desktop_cart_basket_wrapper');
const messageElement = document.getElementById('message_box');
const menue = document.getElementById('menue');
const body = document.getElementsByTagName('body')[0];

// saves the id and the amount
// of the dish whos added to cart 
let cartItemId = [];
let cartItemAmount = [];
let totalPrice = 0;
let deliveryPrice = 0;
let deliverySwitchStatus = false;

let mobileCartStatus = false;
let deviceModeMobile = false;


function init() {
    checkWindowWidth();
    getFromLocalStorage();
    renderDishes();
    renderCartBasket();
}

window.addEventListener('resize', function() {
    checkWindowWidth();
    renderCartBasket();
});

// checks window width and switch to
// desktop or mobile version of cart 
function checkWindowWidth() {
    if (window.innerWidth >= 993) {
        if (mobileCartStatus == true) {
            closeBasket();
        }
        deviceModeMobile = false;
    }else {
        deviceModeMobile = true;
    }
}

// when clicked on open basket btn
// render the cart basket and then show basket wrapper
// prevent scrolling of body when basket open
function toggleOpenBasket() {
    renderCartBasket();
    mobileCartBasketWrapper.classList.toggle('visible');
    mobileCartStatus = true;
    if (body.style.overflow != "hidden") {
        body.style.overflow = "hidden";
    } else {
        body.style.overflow = "auto";
    }
}

// hide basket wrapper
// let scroll body again
function closeBasket() {
    mobileCartBasketWrapper.classList.remove('visible');
    mobileCartStatus = false;
    body.style.overflow = "auto";
}

// when clicked "add to cart"
// shows confirm message
// checks if dish aleready is in array
// if in array, count amount up
// render cart again
function addDishToBasket(index) {
    showMessage("Produkt zum Warenkorb hinzugefügt!\n");
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
function showMessage(message) {
    messageElement.innerHTML += `<p>${message}</<p>`;
    messageElement.classList.add('visible');
    setTimeout(() => {
        messageElement.classList.remove('visible');
        messageElement.innerHTML = "";
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
    deliveryPrice = deliverySwitchStatus ? 5.9 : 0;
    totalPrice = calculateTotalPrice();
    if (deviceModeMobile == true) {
        renderMobileCart();
    }else {
        renderDesktopCart();
    }
    setupDeliverySwitchListener();
    saveToLocalStorage();
}

function renderDesktopCart() {
    desktopCartBasketWrapper.innerHTML = getDesktopCartBasketTemplate();
    let emptyCart = document.getElementById('desktop_empty_cart');
    let cartTableWrapper = document.getElementById('cart_table_wrapper');
    let cartTableContent = document.getElementById('cart_table');

    if (cartItemId.length != 0) {
        isCartEmpty(emptyCart, cartTableWrapper, false);
        for (let i = 0; i < cartItemId.length; i++) {
            const dish = dishes[cartItemId[i]];
            cartTableContent.innerHTML += getNewCartItem(dish.id, dish.name, cartItemAmount[i], dish.price);
        }
    } else {
        isCartEmpty(emptyCart, cartTableWrapper, true);
    }
}

function renderMobileCart() {
    mobileCartBasketWrapper.innerHTML = getMobileCartBasketTemplate();
    let emptyCart = document.getElementById('empty_cart');
    let cartTableWrapper = document.getElementById('cart_table_wrapper');
    let cartTableContent = document.getElementById('cart_table');

    if (cartItemId.length != 0) {
        isCartEmpty(emptyCart, cartTableWrapper, false);
        for (let i = 0; i < cartItemId.length; i++) {
            const dish = dishes[cartItemId[i]];
            cartTableContent.innerHTML += getNewCartItem(dish.id, dish.name, cartItemAmount[i], dish.price);
        }
    } else {
        isCartEmpty(emptyCart, cartTableWrapper, true);
    }
}

// sets up the event listener for the delivery switch
// only once, if not already added
// updates deliveryPrice and deliverySwitchStatus on change
// recalculates totalPrice and re-renders the cart
function setupDeliverySwitchListener() {
    const selector = deviceModeMobile ? '#switch-mobile' : '#switch-desktop';
    const deliverySwitch = document.querySelector(selector);

    if (!deliverySwitch.hasAttribute('data-listener-added')) {
        deliverySwitch.addEventListener('change', function() {
            deliveryPrice = deliverySwitch.checked ? 5.9 : 0;
            deliverySwitchStatus = deliverySwitch.checked;
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
function isCartEmpty(emptyCart, cartTableWrapper, isEmpty) {
    if (isEmpty) {
        emptyCart.style.display = 'block';
        cartTableWrapper.style.display = 'none';
    } else {
        emptyCart.style.display = 'none';
        cartTableWrapper.style.display = 'block';
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
function removeDishFromBasket(id) {
    const index = cartItemId.indexOf(id);
    if (index === -1) return;

    cartItemId.splice(index, 1);
    cartItemAmount.splice(index, 1);

    totalPrice = calculateTotalPrice();
    renderCartBasket();
}

// clears cart; resets all arrays and price
function clearCart(clearMode) {
    if (cartItemId.length && cartItemAmount.length != 0) {
        cartItemId = [];
        cartItemAmount = [];
        totalPrice = calculateTotalPrice();
        renderCartBasket(); 
        saveToLocalStorage();
        closeBasket();
        if (clearMode == 2) {
            openClearCartDialog();
        }
    }else {
        showMessage("Der Warenkorb ist schon leer!");
    }
}

function checkout() {
    if (cartItemId.length && cartItemAmount.length != 0) {
        openCheckoutDialog();
    }else {
        showMessage("Es sind kein Produkte im Warenkorb!");
    }
}

// saves the arrays to localstorage
function saveToLocalStorage() {
    localStorage.setItem("cartItemId", JSON.stringify(cartItemId));
    localStorage.setItem("cartItemAmount", JSON.stringify(cartItemAmount));
    localStorage.setItem("deliverySwitchStatus", JSON.stringify(deliverySwitchStatus));
}

// loads arrays from localstorage to array
function getFromLocalStorage() {
    let localStorageCartItemId = localStorage.getItem("cartItemId");
    let localStorageCartItemAmount = localStorage.getItem("cartItemAmount");
    let localStorageDeliverySwitchStatus = localStorage.getItem("deliverySwitchStatus");

    cartItemId = [];
    cartItemAmount = [];
    deliverySwitchStatus = false;

    checkLocalStorageData(localStorageCartItemId, localStorageCartItemAmount, localStorageDeliverySwitchStatus);

    if ((cartItemId && cartItemAmount) || deliverySwitchStatus) {
        totalPrice = calculateTotalPrice();
    }
}

// this function processes the data from 
// local storage and saves them in the arrays
function checkLocalStorageData(localStorageCartItemId, localStorageCartItemAmount, localStorageDeliverySwitchStatus) {
    if (localStorageCartItemId !== null && localStorageCartItemId !== '[]') {
        cartItemId = JSON.parse(localStorageCartItemId);
    }
    if (localStorageCartItemAmount !== null && localStorageCartItemAmount !== '[]') {
        cartItemAmount = JSON.parse(localStorageCartItemAmount);
    }
    if (localStorageDeliverySwitchStatus !== null && localStorageDeliverySwitchStatus !== '[]') {
        deliverySwitchStatus = JSON.parse(localStorageDeliverySwitchStatus);
    }
    if (cartItemId.length !== cartItemAmount.length) {
        cartItemId = [];
        cartItemAmount = [];
        showMessage("Warenkorb-Daten beschädigt – wurde zurückgesetzt.");
    }
}
