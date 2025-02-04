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


function findProductIndexById(productId) {
    return model.data.products.findIndex(productObject => productId == productObject.id);
}

function findAssortmentObjectById(assortmentId) {
    return model.data.assortment.find(assortmentObject1 => assortmentId == assortmentObject1.id)
}

function findColorObjectById(colorId) {
    return model.data.colorAlt.find(colorObject => colorId == colorObject.id)
}

async function readFromSqlAndUpdateView(firstTime) {
    console.log(model.data.products);
    const apiURL = model.app.ApiURL + '/Product';


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


    await getPatternsFromSQL();
    await getAssortmentsFromSQL();
    await getProductsFromSQL();
    await getCommentsFromSQL();


    updateView();
}



  function showImage(imageBytes) {
    if (imageBytes == "")
      return "";
    else
      return  `data:image/jpeg;base64,${imageBytes}`;
  }


async function getProductsFromSQL() {
    const apiURL = model.app.ApiURL + '/Product';
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
    const apiURL = model.app.ApiURL + '/Pattern';
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
    const apiURL = model.app.ApiURL + '/Assortment';
    await axios.get(apiURL)
        .then(response => {
            model.data.assortment = response.data;
            console.log(model.data.assortment);
        })
        .catch(error => {
            console.error('Error!', error);
        });
}

async function getCommentsFromSQL() {
    const apiURL = model.app.ApiURL + '/Comment';
    await axios.get(apiURL)
        .then(response => {
            model.data.comments = response.data;
            console.log(model.data.comments);
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
        try {
            delete element.id;
            await postProductToSQL(element);
        }

        catch (error) { console.error('Error processing product:', error); }

    };
}

// Helper function to convert ArrayBuffer (or Uint8Array) to Base64
function arrayBufferToBase64(uint8Array) {
    let binary = '';
    const len = uint8Array.length;
    for (let i = 0; i < len; i++) {
        binary += String.fromCharCode(uint8Array[i]);
    }
    return window.btoa(binary); // Convert binary string to Base64
  }

async function postAssortmentToSQL(assortment) {
    const apiURL = model.app.ApiURL + '/Assortment';
    
    await axios.post(apiURL, assortment)

        .catch(error => {
            console.error('Error!', error);
        });
}

async function postPatternToSQL(pattern) {
    const apiURL = model.app.ApiURL + '/Pattern';
    await axios.post(apiURL, pattern)

        .catch(error => {
            console.error('Error!', error);
        });
}


async function postProductToSQL(element) {
    const apiURL = model.app.ApiURL + '/Product';
    await axios.post(apiURL, element,)
        .catch(error => {
            console.error('Error creating product:', error);
        });
}

async function postCommentToSQL(commentObject){
    
    const apiURL = model.app.ApiURL + '/Comment';
    await axios.post(apiURL, commentObject)

        .catch(error => {
            console.error('Error!', error);
        });
}


async function deleteAssortmentFromSQL(id) {
    const apiURL = model.app.ApiURL + '/Assortment' + `?id=${id}`;
    await axios.delete(apiURL)
        .catch(error => {
            console.error('Error', error);

        });
}

async function deletePatternFromSQL(id) {
    const apiURL = model.app.ApiURL + '/Pattern' + `?id=${id}`;
    await axios.delete(apiURL)
        .catch(error => {
            console.error('Error', error);
            alert("Feil ved sletting: " + error.response.data.message)
        });
}

async function deleteProductFromSQL(id) {
    const apiURL = model.app.ApiURL + '/Product' + `?id=${id}`;
    await axios.delete(apiURL)
        .catch(error => {
            console.error('Error', error);
        });
}

async function deleteCommentFromSQL(id) {
    const apiURL = model.app.ApiURL + '/Comment' + `?id=${id}`;
    await axios.delete(apiURL)
        .catch(error => {
            console.error('Error', error);
        });
}

async function putCommentInSQL(id){
    const apiURL = model.app.ApiURL + '/Comment' + `?id=${id}`;
    await axios.put(apiURL)
        .catch(error => {
            console.error('Error', error);
        });
}