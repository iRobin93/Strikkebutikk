function updateViewProduct() {
    if (model.input.productSite.id === "")
        return;
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
    
    <div class="product-container">
    <div class="product-name">${productObject.productName}</div>

    <div class="product-attribute">
        <div class="label">Tilgjengelige farger:</div>
        <select class="product-select" ${selectedProcuct ? "selected" : ""} onchange="model.input.productSite.colorId=this.value == '' ? '' : Number(this.value)">
            <option value="">Velg Farge</option>
            ${getAvailableColors(productObject)}
        </select>
    </div>

    <div class="spacer"></div>

    <div class="product-attribute">
        <div class="label">Tilgjengelige størrelser:</div>
        <select class="product-select" ${selectedSize ? "selected" : ""} onchange="model.input.productSite.size=this.value">
            <option>Velg størrelse </option>
            ${productObject.sizes.map(size => `<option ${size == model.input.productSite.size ? "selected" : ""} value="${size}">${size.toUpperCase()}</option>`).join('')}
        </select>
    </div>

    <div class="spacer"></div>

    <div class="product-attribute">
        <div class="label">Antall på lager:</div>
        <div>${productObject.quantity}</div>
    </div>

    <div class="spacer"></div>

    <div class="product-attribute">
        <div class="label">Antall:</div>
        <div class="count-buttons">
            <button class="button" onclick="productSiteCountButton(false, ${productObject.quantity})">-</button>
            ${model.input.productSite.chosenCount}
            <button class="button" onclick="productSiteCountButton(true, ${productObject.quantity})">+</button>
        </div>
    </div>

    <div class="spacer"></div>

    <div class="product-attribute">
        <div class="label">Pris:</div>
        <div>${productObject.price}</div>
        <button class="button" onclick="addToCart()">Legg til i handlevogn </button>
    </div>

    <div class="spacer"></div>

    <div class="product-info">${productObject.productInfo}</div>

    <div class="spacer"></div>

    <div class="product-attribute">
        <div class="label">Garntype:</div>
        <div>${getYarnType(productObject.assortmentId)}</div>
    </div>

    <div class="product-attribute">
        <div class="label">Mønster:</div>
        <div>${getPatternName(productObject.patternId)}</div>
    </div>


    <div class="shipping-container">
        <div class="shipping-item">
            <div class="label">Leveringstid:</div>
            <div class="value">2-4 virkedager</div> <!-- Example value, adjust as needed -->
        </div>

        <div class="shipping-item">
            <div class="label">Fraktpris:</div>
            <div class="value">Gratis frakt</div> <!-- Example value, adjust as needed -->
        </div>

        <div class="shipping-action">
            <button class="button">Etterspør</button>
        </div>
    </div>
</div>
`;

    return html;
}



function drawProductSiteContainer3(productObject) {
    let html = "";
    html = /*HTML*/`
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