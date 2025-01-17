function updateViewOverview() 
{
    let html = "";
    html += "<table>";
    html += /*HTML*/ `
                    <table>
                        <tr>
                            <th>Oppgave</th>
                            <th>Person</th>
                            <th>Frist</th>
                            <th>Gjort</th>
                            <th></th>
                            <th></th>
                            
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
                            <td>${product.productImg}</td>
                        </tr>
    
    
    
    `;
}