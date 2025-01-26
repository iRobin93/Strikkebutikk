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
    let selectedProcuct = false;
    let selectedSize = false;
    if (model.input.productSite.colorId === "")
        selectedProcuct = true;
    if (model.input.productSite.size === "")
        selectedSize = true;





    let html = /*HTML*/`
    
    <div>${productObject.productName}</div>
    <div>
    <div>Tilgjengelige farger: <select  ${selectedProcuct ? "selected" : ""} onchange="model.input.productSite.colorId=this.value == '' ? '' : Number(this.value)"> <option value="">Velg Farge</option>${getAvailableColors(productObject)}</select></div>
    <div>Tilgjengelige størrelser: <select ${selectedSize ? "selected" : ""} onchange="model.input.productSite.size=this.value"> <option>Velg størrelse </option>${productObject.sizes.map(size => `<option ${size == model.input.productSite.size ? "selected" : ""} value="${size}">${size.toUpperCase()}</option>`).join('')}</select></div>
    <div>Antall på lager: ${productObject.quantity}</div>
    <div><button onclick="productSiteCountButton(false, ${productObject.quantity})">-</button> ${model.input.productSite.chosenCount} <button onclick="productSiteCountButton(true, ${productObject.quantity})">+</button></div>
    <div>Pris: ${productObject.price}<button onclick="addToCart()">Legg til i handlevogn </button></div>
    <div></div>
    <div>${productObject.productInfo}</div>
    </div>
    
    <div> Garntype: ${getYarnType(productObject.assortmentId)}</div>
`;

    return html;
}



function drawProductSiteContainer3(productObject) {
    let html = "";
    html = /*HTML*/`
    <div>Leveringstid</div>
    <div>Fraktpris</div>
    <button>Etterspør</button>

    
    
    `;

    return html;
}


function getAvailableColors(productObject) {

    let html = "";
    let assortmentObject = findAssortmentObjectById(productObject.assortmentId);
    assortmentObject.colorIds.forEach((colorId) => {
        let colorObject = findColorObjectById(colorId);
        html += /*HTML*/ `
        <option ${model.input.productSite.colorId === colorId ? "selected" : ""} value="${colorObject.id}">${colorObject.color}</option>
        
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