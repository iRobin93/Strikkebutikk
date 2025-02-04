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
      productImg: createProduct.file.name,
    };

    newProduct.productImg = await uploadImageToCDN(model.input.createProduct.file);
    
    for (let i = 0; i < model.input.createProduct.colorAltIds.length; i++)
      newProduct.colorAltIds.push(Number(model.input.createProduct.colorAltIds[i]))

    resetInputProductFields();
    model.data.products.push(newProduct);
    if (useBackend) {

      try {
        delete newProduct.id;
        await postProductToSQL(newProduct);
      } 
      catch (error) 
      { console.log('Error: ', error) }

      readFromSqlAndUpdateView(false);
    }
    else
      updateView();
  }
}

async function uploadImageToCDN(file){
          // Create a FormData object to send the file
          let responsedata;
          let data;
          const formData = new FormData();
          formData.append("file", file); // 'file' is the key that Cloudinary expects
          formData.append("upload_preset", "strikkebutikk"); // Replace with your Cloudinary upload preset
          formData.append("public_id", file.name); // Set your custom image name here
      
          // Send the request to Cloudinary
          try{
            response = await fetch("https://api.cloudinary.com/v1_1/daiawei7x/image/upload", {
            method: "POST",
            body: formData,
          });
            data = await response.json();
              console.log("Upload successful:", data);
              // You can access the image URL here
              responsedata = data.secure_url;
              
              console.log(responsedata);
          }
          
            catch(error) {
              console.error("Error uploading the image:", error);
            };
            return responsedata;
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



