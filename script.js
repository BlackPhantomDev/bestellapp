let cartBasketWrapper = document.getElementById('cart_basket_wrapper');
let menue = document.getElementById('menue');


function init() {
    renderDishes();
}

function toggleOpenBasket() {
    cartBasketWrapper.classList.toggle('visible');
}

function renderDishes() {
    for (let index = 0; index < dishes.length; index++) {
        const dish = dishes[index];
        console.table(dish);

        menue.innerHTML += getDishTemplate(
            dish.name,
            dish.description,
            dish.imgSrc
        );
    }
}