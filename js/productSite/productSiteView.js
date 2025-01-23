function updateViewProduct() {
    let index = model.data.products.findIndex(productObject => productObject.id == model.input.product.id)
    let productObject = model.data.products[index];


    app.innerHTML += /*HTML*/ ` 
    <div class="productSiteContainer0">
        <div class="productSiteContainer1">
            ${drawProductSiteContainer1(productObject, index)}
        </div>  
        <div class="productSiteContainer2">
            ${drawProductSiteContainer2(productObject)}
        </div>  
        <div class="productSiteContainer3">
            ${drawProductSiteContainer3(productObject)}
        </div>  
    </div>
`;
}

function showProductImage(index) {
    let productObject = model.data.products[index];
    if (typeof productObject.productImg === 'string' || productObject.productImg instanceof String)
        return productObject.productImg;
    else
        return showImage(productObject.productImg);
}


function drawProductSiteContainer1(productObject, index) {
    let html = /*HTML*/`
    
    <img src="${showProductImage(index)}"/>
    <img class="productAlbumImg" src="${productObject.productAlbum[0]}"/>
    <img class="productAlbumImg" src="${productObject.productAlbum[1]}"/>
    <img class="productAlbumImg" src="${productObject.productAlbum[2]}"/>
    `
    return html;
}

function drawProductSiteContainer2(productObject) {
    let html = /*HTML*/`
    <div>${productObject.productName}</div>
    <div>Tilgjengelige farger: <select></select></div>

`

    return html;
}



function drawProductSiteContainer3(productObject) {
    return "";
}


function getAvailableColors(productObject) {
    let html = "";
    let index = model.data.assortment.findIndex(assortmentObject => productObject.id == assortmentObject.id)
    model.data.assortment[index].colorIds.forEach((colorId) =>{
        let indexColor = model.data.colorAlt.findIndex(colorObject => colorId == colorObject.id)
        html += /*HTML*/ `
    
    
    `;
    });



    return html;
}








function TEst() {
    html += `<div class="sortimentText"></div>
    <div class="assortmentContainer">
    <div><img src="${showProductImage(index)}" id="productImage" /></div> 
    <div>${productObject.productName}</div>`
}    