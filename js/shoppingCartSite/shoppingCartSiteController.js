function getSumOfShoppingCart(){
    let sum = 0;
    for(let i = 0; i < model.input.shoppingCart.shoppingCartLines.length; i++)
        {
            
            let productIndex = findProductIndexById(model.input.shoppingCart.shoppingCartLines[i].productId);
            let product = model.data.products[productIndex];

            sum += product.price * model.input.shoppingCart.shoppingCartLines[i].quantity;
        }
        return sum;
}

function buyShoppingCart(){

    model.input.shoppingCart.shoppingCartLines = [];
    alert("Kjøpet er gjennomført, pengene er trukket fra din konto!")
    updateView();
}

function removeFromCart(shoppingCartLinesIndex){
    model.input.shoppingCart.shoppingCartLines.splice(shoppingCartLinesIndex, 1)
    updateView();
}