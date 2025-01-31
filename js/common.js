function getYarnType(assortmentId) {
    let yarnObject = model.data.yarn.find(x => x.id == model.data.assortment[assortmentId].yarnId)
    return yarnObject.type;
}


function getPatternName(patternId) {
    return model.data.pattern[getPatternIndexById(patternId)].name;
}

function getPatternIndexById(patternId) {
    return model.data.pattern.findIndex(patternObject => patternId == patternObject.id);
}

function getColorAlt(colorId) {
    let colorObject = model.data.colorAlt.find(x => x.id == colorId);
    return colorObject.color;
}

function getProductIndexById(productId) {
    return model.data.products.findIndex(x => productId == x.id)
}

function findAssortmentObjectById(assortmentId) {
    return model.data.assortment.find(assortmentObject1 => assortmentId == assortmentObject1.id)
}

function findColorObjectById(colorId) {
    return model.data.colorAlt.find(colorObject => colorId == colorObject.id)
}

async function readFromSqlAndUpdateView(firstTime) {
    console.log(model.data.products);
    const apiURL = 'https://localhost:7022/Product';


    try {
        const response = await axios.get(apiURL)
        if (response.data.length == 0) {
            console.log("Initaliserer data i databasen!")
            await initializePatterns();
            await initializeAssortment();
            await initializeProducts();
        }

    }
    catch (error) {
        if (firstTime) {
            useBackend = false;
            updateView();
            return;
        }
        else
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
        // const byteArray = element.productImg.arrayBuffer();
        // model.input.createProduct.imgName = fileInput.files[0].name;
        // model.input.createProduct.imgByteStream = byteArray
        // element.productImg = showImage(byteArray);
        delete element.id;
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


async function deleteAssortmentFromSQL(id) {
    const apiURL = `https://localhost:7022/Assortment?id=${id}`;
    await axios.delete(apiURL)
        .catch(error => {
            console.error('Error', error);

        });
}

async function deletePatternFromSQL(id) {
    const apiURL = `https://localhost:7022/Pattern?id=${id}`;
    await axios.delete(apiURL)
        .catch(error => {
            console.error('Error', error);
            alert("Feil ved sletting: " + error.response.data.message)
        });
}

async function deleteProductFromSQL(id) {
    const apiURL = `https://localhost:7022/Product?id=${id}`;
    await axios.delete(apiURL)
        .catch(error => {
            console.error('Error', error);
        });
}


