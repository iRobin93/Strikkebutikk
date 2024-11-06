function updateViewAssortment() {
    app.innerHTML += /*HTML*/ ` 
        <div class="sortimentText">Sortiment</div>
        <div class="assortmentContainer">
        <div>Garn:</div> 
        <div>Mønster</div>
        
        <div class="assortmentYarn"> ${createTable()} </div>
        <div class="assortmentYarn">${createPatternTable()} </div>
        </div>

        <div class="assortmentContainer2">
        <div class="assortmentInput"> <input type="text"> </div>
        <div> <button>+</button></div>
        <div> <button>-</button></div>
        <div class="assortmentInput"> <input value="${model.input.assortment.pattern.name}" onchange="model.input.assortment.pattern.name = this.value" type="text"> </div>
        <div> <button onclick="pushNewPattern()">+</button></div>
        <div> <button onclick="removePattern()">-</button></div>
        </div>
    `;
}


function patternClicked(element){
    element.classList.toggle('bordered');
    if(element.classList.contains('bordered')){
        model.input.assortment.pattern.selected.push(Number(element.dataset.patternid))
    }
    else {
        let index = model.input.assortment.pattern.selected.findIndex(function (id) {
            return element.dataset.patternid == id;
        })
        model.input.assortment.pattern.selected.splice(index, 1)
    }
}

function checkPatternId(id){

    
}

function createPatternTable() {
    let html =  /*HTML*/ `
    <table id="PatternTable">
    ${createPatternRows()}

    </table>
    
    `;

    return html
}

function createPatternRows() {
    let html = "";
    for (let i = 0; i < model.data.pattern.length; i++) {
        
        html += /*HTML*/ `
         <tr>
        <td data-patternid=${model.data.pattern[i].id} class="bordered" id="pattern${i}" onclick="patternClicked(this)">
     ${model.data.pattern[i].name}
        </td>
        </tr>
        `


    }

    return html;
}

function createTable() {

    let html =  /*HTML*/ `
    <table id="shoppingCartTable">
    ${createAssortmentRows()}

    </table>
    
    `;

    return html
}

function createHtmlRow(index) {

    let yarnId = model.data.assortment[index].yarnId;

    let foundYarnObject = model.data.yarn.find(yarnObject => yarnObject.id == yarnId)



    return /*HTML*/ `
 <tr>
 <td>
    ${foundYarnObject.type} - ${putColors(index)}
 </td>
 </tr>
 `;
}




function createAssortmentRows() {
    let html = "";
    for (let i = 0; i < model.data.assortment.length; i++) {
        html += createHtmlRow(i);
    }

    return html;

}

function putColors(index) {
    let html = "";

    for (let i = 0; i < model.data.assortment[index].colorIds.length; i++) {
        let colorId = model.data.assortment[index].colorIds[i]
        let foundColorObject = model.data.colorAlt.find(colorObject => colorObject.id == colorId)
        html += foundColorObject.color
        if (i < model.data.assortment[index].colorIds.length - 1)
            html += ","
    }
    return html
}