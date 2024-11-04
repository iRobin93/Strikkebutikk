function updateViewAdd() {
  updateViewAdd();
  function updateViewAdd() {
    app.innerHTML += /*html*/ ` 
        <div class="create-container">             
          <div>
            <input type="file" onchange="readFile(this)"/>
            <img id="productImage" />
          </div>
          <div class="input-container">
            ${drawInput()}
            
        </div>
`;
  }
}

/*
  createProducts: {
      productImg: "",
      productAlbum: [],
      productName: "",
      colorAlt: "",
      yarnTypes: "",
      sizes: [],
      category: "",
      quantity: null,
      productInfo: "",
    },
*/

function drawInput() {
  let html = "";
  html += /*html*/ `
  <div id="label">
    <label for="pName">Produkt navn:</label>
    <input type="text" placeholder="produktnavn" id="pName"
    onchange="model.input.createProducts.productName=this.value"
     />
  </div>
  
  <div>
    <label for="pColor">Farge:</label>
    <input type="text" placeholder="farge alternativ" id="pColor"
    onchange="model.input.createProducts.colorAlt=this.value"
     />
  </div>    
  
  <div>
    <label for="pYarn">Garntype:</label>
    <input type="text" placeholder="garntype" id="pYarn"
    onchange="model.input.createProducts.yarnTypes=this.value"
     />
  </div>  

  <div>
    <label for="pSize">Størrelse:</label>
    <input type="text" placeholder="størrelse" id="pSize"
    onchange="model.input.createProducts.size=this.value"
     />
  </div>  

  <div>
    <label for="pCategory">Kategori:</label>
    <input type="text" placeholder="kategori" id="pCategory"
    onchange="model.input.createProducts.category=this.value"
     />
  </div>

  <div>
    <label for="pQuantity">Antall:</label>
    <input type="number" placeholder="antall" id="pQuantity"
    onchange="model.input.createProducts.quantity=this.value"
    />
  </div>
  
  <div>
    <label for="pInfo">Produkt info:</label>
    <input type="text" placeholder="produkt info" id="pInfo"
    onchange="model.input.createProducts.productInfo=this.value"
    style="height:50px; text-align: start;"/>
  </div>
  <div>
    <button onclick="createProduct()">Legg til</button>
  </div>
</div>
  `;
  return html;
}

function createProduct() {
  let createProduct = model.input.createProducts;

  if (
    !createProduct.productName ||
    !createProduct.colorAlt ||
    !createProduct.yarnTypes ||
    !createProduct.sizes ||
    !createProduct.category ||
    !createProduct.quantity ||
    !createProduct.productInfo
  ) {
    return;
  } else {
    let newProduct = {
      productAlbum: [null],
      productName: createProduct.productName,
      colorAlt: createProduct.colorAlt,
      yarnTypes: createProduct.yarnTypes,
      sizes: [createProduct.sizes],
      category: createProduct.category,
      quantity: createProduct.quantity,
      productInfo: createProduct.productInfo,
    };

    model.data.createProducts.push(newProduct);
    updateView();
  }
}

async function readFile(fileInput) {
  const byteArray = await fileInput.files[0].arrayBuffer();
  showImage("myImage", byteArray);
}

function showImage(productImage, imageBytes) {
  const blob = new Blob([imageBytes], {
    type: "image/jpeg",
  });
  const urlCreator = window.URL || window.webkitURL;
  const imageUrl = urlCreator.createObjectURL(blob);
  document.getElementById("productImage").src = imageUrl;
}
