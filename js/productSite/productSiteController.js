function productSiteCountButton(increase, quantity) {
    if (increase) {
        model.input.productSite.chosenCount++
    }
    else {
        if (model.input.productSite.chosenCount > 0)
            model.input.productSite.chosenCount--
    }
    updateView();
}


function addToCart() {

    if (model.input.productSite.chosenCount > 0 && model.input.productSite.colorId != "" && model.input.productSite.size != "") {
        model.input.shoppingCart.shoppingCartLines.push({
            productId: model.input.productSite.id,
            quantity: model.input.productSite.chosenCount,
            colorId: model.input.productSite.colorId,
            size: model.input.productSite.size,
        });
        model.input.productSite.chosenCount = 0;
        model.input.productSite.colorId = "";
        model.input.productSite.size = "";

        updateView();
    }

    else alert("Du må velge noe innenfor alternativene!")

    
}