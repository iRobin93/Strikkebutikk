function pushNewPattern(){
    let newId = Math.max(...model.data.pattern.map(patternObject => patternObject.id)) + 1;
    model.data.pattern.push({id: newId, name: model.input.assortment.pattern.name, path: "path"})
    updateView();
}