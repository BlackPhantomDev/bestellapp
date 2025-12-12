function getDishTemplate(name, description, imgSrc, dishId) {
    return `
    
        <div id="dish">
            <h3>${name}</h3>
            <p>${description}</p>
            <img src="${imgSrc}" width=300px alt="">
            <button id="add_dish" onclick="addDishToBasket(${dishId})">+</button>
        </div>

    `;
}