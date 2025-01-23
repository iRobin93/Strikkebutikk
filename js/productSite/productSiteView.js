function updateViewProduct() {
    let index = model.data.products.findIndex(productObject => productObject.id == model.input.productSite.id)
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
    let selected2 = false;
    if (model.input.productSite.colorId === "")
        selected2 = true;
    let html = /*HTML*/`
    <div>${productObject.productName}</div>
    <div>Tilgjengelige farger: <select  ${selected2 ? "selected" : ""} onchange="model.input.productSite.colorId=this.value == '' ? '' : Number(this.value)"> <option value="">Velg Farge</option>${getAvailableColors(productObject)}</select></div>

`

    return html;
}



function drawProductSiteContainer3(productObject) {
    return "";
}


function getAvailableColors(productObject) {
    let selected = false;
    let html = "";
    let assortmentObject = findAssortmentObjectById(productObject.assortmentId);
    assortmentObject.colorIds.forEach((colorId) =>{
        let colorObject = findColorObjectById(colorId);
        if(model.input.productSite.colorId === colorId)
            selected = true;
        html += /*HTML*/ `
        <option ${selected ? "selected" : ""} value="${colorObject.id}">${colorObject.color}</option>
        
    `;
    selected = false;
    });



    return html;
}








function TEst() {
    html += `<div class="sortimentText"></div>
    <div class="assortmentContainer">
    <div><img src="${showProductImage(index)}" id="productImage" /></div> 
    <div>${productObject.productName}</div>`
}    