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