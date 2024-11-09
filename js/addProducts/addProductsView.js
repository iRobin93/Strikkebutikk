function updateViewAdd() {
    app.innerHTML += /*html*/ ` 
        <div class="create-container">             
          <div>
            <input id="fileField" type="file" onchange="readFile(this)"style="display:none;"/>
            <label class="button" for="fileField">Velg fil</label>
            <img src="${showImage(model.input.createProduct.imgByteStream)}" alt="Velg Bilde" id="productImage" />
          </div>
          <div class="input-container">
            ${drawInput()}
            
        </div>
`;
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
    <input value="${model.input.createProduct.productName}" type="text" placeholder="produktnavn" id="pName"
    onchange="model.input.createProduct.productName=this.value"
     />
  </div>
  
  <div>
    <label for="pColor">Farge:</label>
    <input value="${model.input.createProduct.colorAlt}"  type="text" placeholder="farge alternativ" id="pColor"
    onchange="model.input.createProduct.colorAlt=this.value"
     />
  </div>    
  
  <div>
    <label for="pYarn">Garntype:</label>
    <input value="${model.input.createProduct.yarnTypes}"  type="text" placeholder="garntype" id="pYarn"
    onchange="model.input.createProduct.yarnTypes=this.value"
     />
  </div>  

  <div>
    <label for="pSize">Størrelse:</label>
    <input value="${model.input.createProduct.size}"  type="text" placeholder="størrelse" id="pSize"
    onchange="model.input.createProduct.size=this.value"
     />
  </div>  

  <div>
    <label for="pPattern">Mønster:</label>
    ${drawPatternOptions()}
  </div>  

  <div>
    <label for="pCategory">Kategori:</label>
    <input value="${model.input.createProduct.category}"  type="text" placeholder="kategori" id="pCategory"
    onchange="model.input.createProduct.category=this.value"
     />
  </div>

  <div>
    <label for="pQuantity">Antall:</label>
    <input value="${model.input.createProduct.quantity}"  type="number" placeholder="antall" id="pQuantity"
    onchange="model.input.createProduct.quantity=this.value"
    />
  </div>
  
  <div>
    <label for="pInfo">Produkt info:</label>
    <input value="${model.input.createProduct.productInfo}"  type="text" placeholder="produkt info" id="pInfo"
    onchange="model.input.createProduct.productInfo=this.value"
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
  let createProduct = model.input.createProduct;

  if (
    !createProduct.productName ||
    !createProduct.colorAlt ||
    !createProduct.yarnTypes ||
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
      id: getId(),
      productAlbum: [],
      productName: createProduct.productName,
      colorAlt: createProduct.colorAlt,
      yarnTypes: createProduct.yarnTypes,
      sizes: [createProduct.size],
      category: createProduct.category,
      quantity: createProduct.quantity,
      productInfo: createProduct.productInfo,
      patternId: createProduct.patternId,
      productImg: createProduct.imgByteStream,
    };
    resetInputProductFields();
    model.data.products.push(newProduct);
    updateView();
  }
}

function resetInputProductFields(){
  let createProduct = model.input.createProduct;

  createProduct.productName = "";
  createProduct.colorAlt = "";
  createProduct.yarnTypes = "";
  createProduct.size = "";
  createProduct.category = "";
  createProduct.quantity = 0;
  createProduct.productInfo = "";
  createProduct.patternId = "";
  createProduct.imgByteStream = "";
  createProduct.imgName = "";
}

function getId() {
  let newId
  if (model.data.products.length == 0)
    newId = 0;
  else
    newId = Math.max(...model.data.products.map(productObject => productObject.id)) + 1;
  return newId;
}

async function readFile(fileInput) {
  const byteArray = await fileInput.files[0].arrayBuffer();
  model.input.createProduct.imgName = fileInput.files[0].name;
  model.input.createProduct.imgByteStream = byteArray
  let imageUrl = showImage(byteArray);
  document.getElementById("productImage").src = imageUrl;
}

function showImage(imageBytes) {
  if(imageBytes == "")
    return "";

  

  const blob = new Blob([imageBytes], {
    type: "image/jpeg",
  });
  const urlCreator = window.URL || window.webkitURL;
  const imageUrl = urlCreator.createObjectURL(blob);
  
  return imageUrl;
}


function drawPatternOptions() {
  let selected2 = false;
  if (model.input.createProduct.patternId === "")
    selected2 = true;
  let html = /*HTML*/ `<select ${selected2 ? "selected" : ""} onchange="model.input.createProduct.patternId=this.value == '' ? '' : Number(this.value)" id="createMenuPattern" name="createMenuPattern">
    <option value="">Velg Mønster</option>`;

  let selected = false


  for (i = 0; i < model.data.pattern.length; i++) {
    if (model.input.createProduct.patternId === model.data.pattern[i].id)
      selected = true;
    html += `<option  value="${model.data.pattern[i].id}" ${selected ? "selected" : ""}>${model.data.pattern[i].name}</option>`;
    selected = false;
  }


  html += '</select>';
  return html;
}