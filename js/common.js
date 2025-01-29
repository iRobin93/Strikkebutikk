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

async function readFromSqlAndUpdateView() {
    console.log(model.data.products);
    const apiURL = 'https://localhost:7022/Product';

    await axios.get(apiURL)
        .then(response => {
            if(response.data.length == 0)
                {
                    console.log("Initaliserer data i databasen!")
                    initializeProducts();
                    initializePatterns();
                    initializeAssortment();
                }
           
        })
        .catch(error => {
            console.error('Error!', error);
        });


        await getAssortmentsFromSQL();
        await getPatternsFromSQL();
        await getProductsFromSQL();
    

        updateView();
}

function findProductIndexById(productId){
 return model.data.products.findIndex(productObject => productId == productObject.id);
}


async function getProductsFromSQL(){
    const apiURL = 'https://localhost:7022/Product';
    await axios.get(apiURL)
        .then(response => {
            model.data.products = response.data;
            for(i = 0; i < model.data.products.length; i++){
                
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

async function getAssortmentsFromSQL(){
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


function initializePatterns(){
    model.data.pattern.forEach(element => {
        postAssortmentToSQL(element);
    })
}

function initializeAssortment(){
    model.data.assortment.forEach(element => {
        postAssortmentToSQL(element);
    });
}

function initializeProducts(){
    model.data.products.forEach(element => {

        element.productAlbumJSON = JSON.stringify(element.productAlbum);
        element.sizesJSON = JSON.stringify(element.sizes);
        delete element.id;
        delete element.productAlbum;
        delete element.sizes;

        postProductToSQL(element);
    });
}

function postAssortmentToSQL(assortment){
    const apiURL = 'https://localhost:7022/Assortment';
    axios.post(apiURL, assortment)
  
      .catch(error => {
        console.error('Error!', error);
      });
}

function postPatternToSQL(pattern){
    const apiURL = 'https://localhost:7022/Pattern';
    axios.post(apiURL, pattern)
  
      .catch(error => {
        console.error('Error!', error);
      });
}


function postProductToSQL(product) {
    const apiURL = 'https://localhost:7022/Product';
    axios.post(apiURL, product)
  
      .catch(error => {
        console.error('Error!', error);
      });
  }


  function deleteAssortmentFromSQL(id){
    const apiURL = 'https://localhost:7022/Assortment';
    axios.delete(apiURL, id)
    .catch(error => {
        console.error('Error', error);
    });
  }

  function deletePatternFromSQL(id){
    const apiURL = 'https://localhost:7022/Pattern';
    axios.delete(apiURL, id)
    .catch(error => {
        console.error('Error', error);
    });
  }


