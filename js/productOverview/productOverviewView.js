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
                            <th>Antall</th>
                            
                        </tr>`;


    for(let i = 0; i < model.data.products.length; i++)
    {
        html += createHtmlRowOverview(i);
    }
    html += "</table>";


    app.innerHTML += html;
}

function createHtmlRowOverview(i)
{
    let product = model.data.products[i];
    return /*HTML*/ `
                        <tr>
                            <td><img class="ProductPicture" src="${showProductImage(i)}"/></td>
                            <td>${product.productName}</td>
                            <td>${product.category}</td>
                            <td>${model.data.pattern[product.patternId].name}</td>
                            <td>${getYarnType(product.assortmentId)}</td>
                            <td>${product.quantity}</td>
                        </tr>
    
    
    
    `;
}