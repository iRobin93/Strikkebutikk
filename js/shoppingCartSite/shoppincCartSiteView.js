function updateViewShoppingCart(){
    let html = "";
    html += "<table>";
    html += /*HTML*/ `
                    <table>
                        <tr>
                            <th>Bilde</th>
                            <th>Produktnavn</th>
                            <th>Kategori</th>
                            <th>Mønster</th>
                            <th>Garn</th>
                            <th>Størrelse</th>
                            <th>Antall</th>
                            <th>Pris per stykk</th>
                            <th>Sum</th>
                            
                        </tr>`;


    for(let i = 0; i < model.input.shoppingCart.shoppingCartLines.length; i++)
    {
        html += createHtmlRowShoppingCart(i);
    }
    html += "</table>";

    html += /*HTML*/`
    <div>&nbsp;</div>
    <div> Summen er: ${getSumOfShoppingCart()}</div>
    <div>&nbsp;</div>
    <button class="button" onclick="buyShoppingCart()">Kjøp</button>
    `;

    app.innerHTML += html;
}



function createHtmlRowShoppingCart(shoppingCartLinesIndex)
{   

    let productIndex = findProductIndexById(model.input.shoppingCart.shoppingCartLines[shoppingCartLinesIndex].productId);
    let product = model.data.products[productIndex];
    return /*HTML*/ `
                        <tr style="cursor: pointer;" onclick="model.input.productSite.id = ${product.id}; model.input.productSite.colorId=''; model.app.page = 'productSite'; updateView(); ">
                            <td><img class="ProductPicture" src="${showProductImage(productIndex)}"/></td>
                            <td>${product.productName}</td>
                            <td>${product.category}</td>
                            <td>${getPatternName(product.patternId)}</td>
                            <td>${getYarnType(product.assortmentId)}</td>
                            <td>${model.input.shoppingCart.shoppingCartLines[shoppingCartLinesIndex].size.toLocaleUpperCase()}</td>
                            <td>${model.input.shoppingCart.shoppingCartLines[shoppingCartLinesIndex].quantity}</td>
                            <td>${product.price}</td>
                            <td>${product.price * model.input.shoppingCart.shoppingCartLines[shoppingCartLinesIndex].quantity}</td>
                            <td style="cursor: default;" onclick="event.stopPropagation();">
                              <button style="cursor: pointer;" onclick="removeFromCart(${shoppingCartLinesIndex}); event.stopPropagation();">Slett</button>
                            </td>
                        </tr>
    `;
}