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
    <label for="pYarn">Garntype:</label>
    ${drawYarnOptionsProductView()}
  </div>  

  <div>
    <label for="pColor">Farge:</label>
    ${drawColorAltProductView()}
     
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
      id: getId(),
      productAlbum: [],
      productName: createProduct.productName,
      colorAlt: [],
      yarnTypes: createProduct.yarnTypes,
      sizes: [createProduct.size],
      category: createProduct.category,
      quantity: createProduct.quantity,
      productInfo: createProduct.productInfo,
      patternId: createProduct.patternId,
      productImg: createProduct.imgByteStream,
    };

    for(let i = 0; i < model.input.createProduct.colorAlt.length; i++)
      newProduct.colorAlt.push(Number(model.input.createProduct.colorAlt[i]))
    resetInputProductFields();
    model.data.products.push(newProduct);
    updateView();
  }
}

function resetInputProductFields() {
  let createProduct = model.input.createProduct;

  createProduct.productName = "";
  createProduct.colorAlt = [];
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
  if (imageBytes == "")
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

function drawYarnOptionsProductView() {

  let selected2 = false;
  if (model.input.createProduct.yarnTypes === "")
    selected2 = true;
  let html = /*HTML*/ `<select ${selected2 ? "selected" : ""} onchange="model.input.createProduct.yarnTypes=this.value == '' ? '' : Number(this.value); updateView()" id="createMenuYarn" name="createMenuYarn">
      <option value="">Velg Garn</option>`;

  let selected = false


  for (i = 0; i < model.data.assortment.length; i++) {
    if (model.input.createProduct.yarnTypes === model.data.assortment[i].id)
      selected = true;
    html += `<option  value="${model.data.assortment[i].id}" ${selected ? "selected" : ""}>${getYarnType(i)}</option>`;
    selected = false;
  }


  html += '</select>';
  return html;
}

function getYarnType(index) {
  let yarnObject = model.data.yarn.find(x => x.id == model.data.assortment[index].yarnId)

  return yarnObject.type
}




function drawColorAltProductView() {

  let html = /*HTML*/ `<select onchange="changedColorAltProductViewInput(this)" multiple id="createMenuColors" name="createMenuColors">
  `;
  
  if (model.input.createProduct.yarnTypes === "")
    return "";
  let selected = false
  let assortmentObject = model.data.assortment.find(x => x.id == model.input.createProduct.yarnTypes)

  for (let i = 0; i < assortmentObject.colorIds.length; i++) {
    for(let j = 0; j < model.input.createProduct.colorAlt.length; j++)
    if (model.input.createProduct.colorAlt[j] === assortmentObject.colorIds[i]){
      selected = true;
    }
      
    html += `<option  value="${assortmentObject.colorIds[i]}" ${selected ? "selected" : ""}>${getColorAlt(assortmentObject.colorIds[i])}</option>`;
    selected = false;
  }




  html += '</select>';
  return html;
}

function changedColorAltProductViewInput(element) {
  model.input.createProduct.colorAlt = [];
  for (let i = 0; i < element.options.length; i++) {
    if (element.options[i].selected == true)
      model.input.createProduct.colorAlt.push(Number(element.options[i].value))
  }
}

function getColorAlt(colorId) {

  let colorObject = model.data.colorAlt.find(x => x.id == colorId)

  return colorObject.color
}