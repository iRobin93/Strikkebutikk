function getYarnType(assortmentId) {
    let yarnObject = model.data.yarn.find(x => x.id == model.data.assortment[assortmentId].yarnId)
    return yarnObject.type;
}


function getPatternName(patternId) {
    return model.data.pattern[getPatternIndexById(patternId)].name;
}

function getPatternIndexById(patternId){
    return model.data.pattern.findIndex(patternObject => patternId == patternObject.id);
}

function getColorAlt(colorId) {
    let colorObject = model.data.colorAlt.find(x => x.id == colorId);
    return colorObject.color;
}

function findAssortmentObjectById(assortmentId) {
    return model.data.assortment.find(assortmentObject1 => assortmentId == assortmentObject1.id)
}

function findColorObjectById(colorId) {
    return model.data.colorAlt.find(colorObject => colorId == colorObject.id)
}

async function readFromSqlAndUpdateView() {
    console.log(model.data.products);
    const apiURL = 'https://localhost:7022/Product';

    const response = await axios.get(apiURL)
    try {

        if (response.data.length == 0) {
            console.log("Initaliserer data i databasen!")        
            await initializePatterns();
            await initializeAssortment();
            await initializeProducts();
        }

    }
    catch (error) {
        console.error('Error!', error);
    };


    await getAssortmentsFromSQL();
    await getPatternsFromSQL();
    await getProductsFromSQL();


    updateView();
}

function findProductIndexById(productId) {
    return model.data.products.findIndex(productObject => productId == productObject.id);
}


async function getProductsFromSQL() {
    const apiURL = 'https://localhost:7022/Product';
    await axios.get(apiURL)
        .then(response => {
            model.data.products = response.data;
            for (i = 0; i < model.data.products.length; i++) {

                model.data.products[i].productAlbum = JSON.parse(model.data.products[i].productAlbumJSON);
                model.data.products[i].sizes = JSON.parse(model.data.products[i].sizesJSON);
                delete model.data.products[i].productAlbumJSON
                delete model.data.products[i].sizesJSON
            }

            console.log(model.data.products);
        })
        .catch(error => {
            console.error('Error!', error);
        });
}

async function getPatternsFromSQL() {
    const apiURL = 'https://localhost:7022/Pattern';
    await axios.get(apiURL)
        .then(response => {
            model.data.pattern = response.data;
            console.log(model.data.pattern);
        })
        .catch(error => {
            console.error('Error!', error);
        });
}

async function getAssortmentsFromSQL() {
    const apiURL = 'https://localhost:7022/Assortment';
    await axios.get(apiURL)
        .then(response => {
            model.data.assortment = response.data;
            console.log(model.data.assortment);
        })
        .catch(error => {
            console.error('Error!', error);
        });
}


async function initializePatterns() {
    for (const element of model.data.pattern) {
        await postPatternToSQL(element);
    };
}

async function initializeAssortment() {
    for (const element of model.data.assortment) {
        await postAssortmentToSQL(element);
    };
}

async function initializeProducts() {
    for (const element of model.data.products) {

        element.productAlbumJSON = JSON.stringify(element.productAlbum);
        element.sizesJSON = JSON.stringify(element.sizes);
        delete element.id;
        delete element.productAlbum;
        delete element.sizes;

        await postProductToSQL(element);
    };
}

async function postAssortmentToSQL(assortment) {
    const apiURL = 'https://localhost:7022/Assortment';
    await axios.post(apiURL, assortment)

        .catch(error => {
            console.error('Error!', error);
        });
}

async function postPatternToSQL(pattern) {
    const apiURL = 'https://localhost:7022/Pattern';
    await axios.post(apiURL, pattern)

        .catch(error => {
            console.error('Error!', error);
        });
}


async function postProductToSQL(product) {
    const apiURL = 'https://localhost:7022/Product';
    await axios.post(apiURL, product)

        .catch(error => {
            console.error('Error!', error);
        });
}


function deleteAssortmentFromSQL(id) {
    const apiURL = `https://localhost:7022/Assortment/id=${id}`;
    axios.delete(apiURL)
        .catch(error => {
            console.error('Error', error);
        });

}

function deletePatternFromSQL(id) {
    const apiURL = `https://localhost:7022/Pattern?id=${id}`;
    axios.delete(apiURL)
        .catch(error => {
            console.error('Error', error);
        });
}


