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
        <div class="assortmentInput"> 
        ${drawYarnOptions()}

        ${drawColorAlts()}

        </div>
        <div> <button>+</button></div>
        <div> <button>-</button></div>
        <div class="assortmentInput"> <input value="${model.input.assortment.pattern.name}" onchange="model.input.assortment.pattern.name = this.value" type="text"> </div>
        <div> <button onclick="pushNewPattern()">+</button></div>
        <div> <button onclick="removePattern()">-</button></div>
        </div>
    `;
}


function drawYarnOptions() {
    let html = `<select onchange="model.input.assortment.yarn.typeId=model.data.yarn[2].id" id="yarns" name="yarns">`;

    let selected = false
    
    
    for (i = 0; i < model.data.yarn.length; i++){
        if(model.input.assortment.yarn.typeId == model.data.yarn[i].id)
            selected = true;
        html += `<option  value="${model.data.yarn[i].id}" ${selected ? "selected" : ""}>${model.data.yarn[i].type}</option>`;
        selected = false;
    }

        
    html += '</select>';
    return html;
}

function drawColorAlts() {
    html = /*HTML*/ `<select id="colors" name="colors" size="${model.data.colorAlt.length}" multiple>`
    for (i = 0; i < model.data.colorAlt.length; i++)
        html += `<option value="${model.data.colorAlt[i].color}">${model.data.colorAlt[i].color}</option>`
    html += '</select>'
    return html
}


function patternClicked(element) {
    element.classList.toggle('bordered');
    if (element.classList.contains('bordered')) {
        model.input.assortment.pattern.selected.push(Number(element.dataset.patternid))
    }
    else {
        let index = model.input.assortment.pattern.selected.findIndex(function (id) {
            return element.dataset.patternid == id;
        })
        model.input.assortment.pattern.selected.splice(index, 1)
    }
}

function checkPatternId(id) {


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
    let selectedClass = "";
    for (let i = 0; i < model.data.pattern.length; i++) {
        if (model.input.assortment.pattern.selected.find(selectedId => selectedId == model.data.pattern[i].id))
            selectedClass = "class='bordered'";
        else
            selectedClass = "";
        html += /*HTML*/ `
         <tr>
        <td data-patternid=${model.data.pattern[i].id} ${selectedClass} id="pattern${i}" onclick="patternClicked(this)">
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