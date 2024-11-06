function pushNewPattern() {
    let newId = Math.max(...model.data.pattern.map(patternObject => patternObject.id)) + 1;
    model.data.pattern.push({ id: newId, name: model.input.assortment.pattern.name, path: "path" });
    model.input.assortment.pattern.name = "";
    updateView();
}

function removePattern() {
    let index = model.data.pattern.findIndex(checkDataPatternId)
    if (index >= 0) {
        model.data.pattern.splice(index, 1)
        model.input.assortment.pattern.selected = [];
        updateView();
    }

}

function checkDataPatternId(patternObject) {
    return patternObject.id == model.input.assortment.pattern.selected[0]
}


