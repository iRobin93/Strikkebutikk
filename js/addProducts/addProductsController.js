function getNewProductId() {
  let newId
  if (model.data.products.length == 0)
    newId = 0;
  else
    newId = Math.max(...model.data.products.map(productObject => productObject.id)) + 1;
  return newId;
}


function createProduct() {
  let createProduct = model.input.createProduct;

  if (
    !createProduct.productName ||
    createProduct.colorAlt.length == 0 ||
    createProduct.yarnTypes === "" ||
    !createProduct.size ||
    !createProduct.category ||
    !createProduct.quantity ||
    !createProduct.productInfo ||
    createProduct.patternId === ""
  ) {
    alert('hei')
    return;
  } else {
    let newProduct = {
      id: getNewProductId(),
      productAlbum: [],
      productName: createProduct.productName,
      colorAlt: [],
      assortmentId: createProduct.yarnTypes,
      sizes: [createProduct.size],
      category: createProduct.category,
      quantity: createProduct.quantity,
      productInfo: createProduct.productInfo,
      patternId: createProduct.patternId,
      productImg: createProduct.imgByteStream,
    };

    for (let i = 0; i < model.input.createProduct.colorAlt.length; i++)
      newProduct.colorAlt.push(Number(model.input.createProduct.colorAlt[i]))
    resetInputProductFields();
    model.data.products.push(newProduct);
    if (useBackend) {
      newProduct.productImg = "source/img/seven-sister-genser.png"
      newProduct.sizesJSON = JSON.stringify(newProduct.sizes);
      newProduct.productAlbumJSON = JSON.stringify(model.data.products[0].productAlbum);
      newProduct.price = 900;
      delete newProduct.id;
      delete newProduct.sizes;
      delete newProduct.productAlbum;
      postProductToSQL(newProduct);
      readFromSql();
    }
   
    updateView();
  }
}

function resetInputProductFields() {
  let createProduct = model.input.createProduct;

  createProduct.productName = "";
  createProduct.colorAlt = [];
  createProduct.assortmentId = "";
  createProduct.size = "";
  createProduct.category = "";
  createProduct.quantity = 0;
  createProduct.productInfo = "";
  createProduct.patternId = "";
  createProduct.imgByteStream = "";
  createProduct.imgName = "";
}



