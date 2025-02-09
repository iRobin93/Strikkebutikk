function updateViewOverview() 
{
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
                            <th>Antall på lager</th>
                            
                        </tr>`;


    for(let i = 0; i < model.data.products.length; i++)
    {
        html += createHtmlRowOverview(i);
    }
    html += "</table>";


    app.innerHTML += html;
}

function createHtmlRowOverview(i) {
    let product = model.data.products[i];
    return /*HTML*/ `
                        <tr style="cursor: pointer;" onclick="model.input.productSite.id = ${product.id}; model.input.productSite.colorId=''; model.app.page = 'productSite'; updateView(); ">
                            <td><img class="ProductPicture" src="${showProductImage(i)}"/></td>
                            <td>${product.productName}</td>
                            <td>${product.category}</td>
                            <td>${getPatternName(product.patternId)}</td>
                            <td>${getYarnType(product.assortmentId)}</td>
                            <td>${product.quantity}</td>
                            ${model.app.isAdmin ? 
                                `<td style="cursor: url('source/img/delete2.png') 16 16, auto; text-align: center; width: 20px;" onclick="deleteProduct(${product.id}); event.stopPropagation();">
                                    <img src="./source/img/delete.png" alt="Delete" style="width: 20px; height: 20px;" />
                                </td>` 
                                : 
                                ''}
                        </tr>
    `;
}