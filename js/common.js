function getYarnType(assortmentId) 
{
    let yarnObject = model.data.yarn.find(x => x.id == model.data.assortment[assortmentId].yarnId)
    return yarnObject.type;
}


function getPatternName(patternId)
{
    return model.data.pattern[patternId].name;
}

function getColorAlt(colorId) 
{
    let colorObject = model.data.colorAlt.find(x => x.id == colorId)
    return colorObject.color
}

  