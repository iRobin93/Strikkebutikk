function getNewProductId() {
  let newId
  if (model.data.products.length == 0)
    newId = 0;
  else
    newId = Math.max(...model.data.products.map(productObject => productObject.id)) + 1;
  return newId;
}


async function createProduct() {
  let createProduct = model.input.createProduct;

  if (
    !createProduct.productName ||
    createProduct.productPrice == 0 ||
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
      productAlbum: ["source/img/seven-sisters1.png",
        "source/img/seven-sisters2.png",
        "source/img/seven-sisters3.png",],
      productName: createProduct.productName,
      price: createProduct.productPrice,
      colorAltIds: [],
      assortmentId: createProduct.yarnTypes,
      sizes: [createProduct.size],
      category: createProduct.category,
      quantity: createProduct.quantity,
      productInfo: createProduct.productInfo,
      patternId: createProduct.patternId,
      productImg: createProduct.imgByteStream,
    };


    for (let i = 0; i < model.input.createProduct.colorAltIds.length; i++)
      newProduct.colorAltIds.push(Number(model.input.createProduct.colorAltIds[i]))

    resetInputProductFields();
    model.data.products.push(newProduct);
    if (useBackend) {

      try {
        delete newProdpostProductToSQLuct.id;
        await (newProduct);
      } 
      catch (error) 
      { console.log('Error: ', error) }

      readFromSqlAndUpdateView(false);
    }
    else
      updateView();
  }
}

function resetInputProductFields() {
  let createProduct = model.input.createProduct;

  createProduct.productName = "";
  createProduct.productPrice = 0;
  createProduct.assortmentId = "";
  createProduct.size = "";
  createProduct.category = "";
  createProduct.quantity = 0;
  createProduct.productInfo = "";
  createProduct.patternId = "";
  createProduct.imgByteStream = "";
  createProduct.imgName = "";
}



