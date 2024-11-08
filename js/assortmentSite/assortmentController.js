function pushNewPattern() {
    if(model.input.assortment.pattern.name == "")
        return
    let newId = Math.max(...model.data.pattern.map(patternObject => patternObject.id)) + 1;
    model.data.pattern.push({ id: newId, name: model.input.assortment.pattern.name, path: "path" });
    model.input.assortment.pattern.name = "";
    updateView();
}

function removePattern() {

    for (let i = 0; i < model.input.assortment.pattern.selected.length; i++) {
        let index = model.data.pattern.findIndex(checkDataId, model.input.assortment.pattern.selected[i])
        if (index >= 0) {
            model.data.pattern.splice(index, 1)
        }
    }
    
    model.input.assortment.pattern.selected = [];
    updateView();

}

function checkDataId(thisObject) {
    return thisObject.id == this
}

function removeAssortment(){
    for(let i = 0; i < model.input.assortment.yarn.selected.length; i++){

    
        let index = model.data.assortment.findIndex(checkDataId, model.input.assortment.yarn.selected[i])
        if (index >= 0) {
            model.data.assortment.splice(index, 1)
        }
    }
    
    model.input.assortment.yarn.selected = [];
    updateView();
}


function addAssortment(){
    if(model.input.assortment.yarn.typeId === "")
        return
    let newId = Math.max(...model.data.assortment.map(assortmentObject => assortmentObject.id)) + 1;
    model.data.assortment.push({ id: newId, yarnId: model.input.assortment.yarn.typeId, colorIds: []});
    model.input.assortment.yarn.typeId = "";
    updateView();
}

