function updateViewProduct() {
    index = model.data.products.findIndex(productObject => productObject.id == model.input.product.id)
    productObject = model.data.products[index];
    app.innerHTML += /*HTML*/ ` 
    <div class="sortimentText"></div>
    <div class="assortmentContainer">
    <div><img src="${showProductImage(index)}" id="productImage" /></div> 
    <div>${productObject.productName}</div>
`;
}

function showProductImage(index){
    let productObject = model.data.products[index];
    if(typeof productObject.productImg === 'string' || productObject.productImg instanceof String)
        return productObject.productImg;
    else
        return showImage(productObject.productImg);
}