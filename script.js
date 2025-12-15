let cartBasketWrapper = document.getElementById('cart_basket_wrapper');
let confirmMessage = document.getElementById('confirm_message');
let menue = document.getElementById('menue');

let cartItemIndex = [];
let cartItem = [];
let cartItemAmount = [];


function init() {
    renderDishes();
    renderCartBasket();
}

function toggleOpenBasket() {
    cartBasketWrapper.classList.toggle('visible');
}

function closeBasket() {
    cartBasketWrapper.classList.remove('visible');
}

function addDishToBasket() {
    showConfirmMessage();
}

function showConfirmMessage() {
    confirmMessage.classList.add('visible');
    setTimeout(() => {
        confirmMessage.classList.remove('visible');
    }, 5000);
}

function renderDishes() {
    for (let index = 0; index < dishes.length; index++) {
        const dish = dishes[index];

        menue.innerHTML += getDishTemplate(
            dish.name,
            dish.price,
            dish.description,
            dish.imgSrc
        );
    }
}

function renderCartBasket() {
    cartBasketWrapper.innerHTML = getCartBasketTemplate();
}


function saveToLocalStorage() {
    
}

function getFromLocalStorage() {
    
}