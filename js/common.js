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

async function readFromSql() {
    console.log(model.data.products);
    const apiURL = 'https://localhost:7022/Product';

    await axios.get(apiURL)
        .then(response => {
            if(response.data.length == 0)
                {
                    console.log("Initaliserer data i databasen!")
                    model.data.products.forEach(element => {

                        element.productAlbumJSON = JSON.stringify(element.productAlbum);
                        element.sizesJSON = JSON.stringify(element.sizes);
                        delete element.id;
                        delete element.productAlbum;
                        delete element.sizes;

                        postProductToSQL(element);
                    });
                }
           
        })
        .catch(error => {
            console.error('Error!', error);
        });



    
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

function findProductIndexById(productId){
 return model.data.products.findIndex(productObject => productId == productObject.id);
}


function postProductToSQL(product) {
    const apiURL = 'https://localhost:7022/Product';
    axios.post(apiURL, product)
  
      .catch(error => {
        console.error('Error!', error);
      });
  }

