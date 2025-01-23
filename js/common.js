function getYarnType(assortmentId) {
    let yarnObject = model.data.yarn.find(x => x.id == model.data.assortment[assortmentId].yarnId)
    return yarnObject.type;
}


function getPatternName(patternId) {
    return model.data.pattern[patternId].name;
}

function getColorAlt(colorId) {
    let colorObject = model.data.colorAlt.find(x => x.id == colorId)
    return colorObject.color
}

function findAssortmentObjectById(assortmentId) {
    return model.data.assortment.find(assortmentObject1 => assortmentId == assortmentObject1.id)
}

function findColorObjectById(colorId) {
    return model.data.colorAlt.find(colorObject => colorId == colorObject.id)
}

function readFromSql() {
    console.log(model.data.products);
    const apiURL = 'https://localhost:7022/Product';
    axios.get(apiURL)
        .then(response => {
            model.data.products = response.data;
            console.log(model.data.products);
        })
        .catch(error => {
            console.error('Error!', error);
        });
}