function updateViewAdd() {
  let imgText = showImage(model.input.createProduct.imgByteStream) == "" ? "hidden" : ""; 
  app.innerHTML += /*html*/ ` 
  <div class="create-container">             
          <div>
            <input id="fileField" type="file" onchange="readFile(this)"style="display:none;"/>
            <label class="button" for="fileField">Velg fil for bilde!</label>
            <div>&nbsp;</div>
            <img ${imgText} src="${showImage(model.input.createProduct.imgByteStream)}" alt="" id="productImage" />
            <div class="input-container">
              ${drawInput()}
              
          </div>
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
  <div id="product-form">
  <h2>Legg til Produkt</h2>
  
  <div class="form-group">
    <label for="pName">Produkt navn:</label>
    <input value="${model.input.createProduct.productName}" type="text" placeholder="Skriv inn produktnavn" id="pName" onchange="model.input.createProduct.productName=this.value" />
  </div>
  
  <div class="form-group">
    <label for="pPrice">Pris:</label>
    <input value="${model.input.createProduct.productPrice}" type="text" placeholder="Skriv inn pris" id="pPrice" onchange="model.input.createProduct.productPrice=Number(this.value)" />
  </div>
  
  <div class="form-group">
    <label for="pYarn">Garntype:</label>
    ${drawYarnOptionsProductView()}
  </div>  

  <div>
  <label for="pColor">Farge:</label>
  ${drawColorAltProductView()}
   
</div>    
  
  <div class="form-group">
    <label for="pSize">Størrelse:</label>
    <input value="${model.input.createProduct.size}" type="text" placeholder="Skriv inn størrelse" id="pSize" onchange="model.input.createProduct.size=this.value" />
  </div>  

  <div class="form-group">
    <label for="pPattern">Mønster:</label>
    ${drawPatternOptions()}
  </div>  

  <div class="form-group">
    <label for="pCategory">Kategori:</label>
    <input value="${model.input.createProduct.category}" type="text" placeholder="Skriv inn kategori" id="pCategory" onchange="model.input.createProduct.category=this.value" />
  </div>

  <div class="form-group">
    <label for="pQuantity">Antall:</label>
    <input value="${model.input.createProduct.quantity}" type="number" placeholder="Skriv inn antall" id="pQuantity" onchange="model.input.createProduct.quantity=this.value" />
  </div>
  
  <div class="form-group">
  <label for="pInfo">Produkt info:</label>
  <textarea id="pInfo" placeholder="Skriv inn produktinfo" onchange="model.input.createProduct.productInfo=this.value">${model.input.createProduct.productInfo}</textarea>
</div>

  <div class="form-group">
    <button onclick="createProduct()" class="submit-btn">Legg til Produkt</button>
  </div>
</div>
  `;
  return html;
}



async function readFile(fileInput) {

  const byteArray = await fileInput.files[0].arrayBuffer();
  model.input.createProduct.file = fileInput.files[0];
  const uint8Array = new Uint8Array(byteArray);

  model.input.createProduct.imgName = fileInput.files[0].name;
  model.input.createProduct.imgByteStream = arrayBufferToBase64(uint8Array);
  let imageUrl = showImage(model.input.createProduct.imgByteStream);

  document.getElementById("productImage").src = imageUrl;
  document.getElementById("productImage").hidden = false;
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
    html += `<option  value="${model.data.pattern[i].id}" ${selected ? "selected" : ""}>${getPatternName(model.data.pattern[i].id)}</option>`;
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






function drawColorAltProductView() {

  let html = /*HTML*/ `<select onchange="changedColorAltProductViewInput(this)" multiple id="createMenuColors" name="createMenuColors">
  `;
  
  if (model.input.createProduct.yarnTypes === "")
    return "";
  let selected = false
  let assortmentObject = model.data.assortment.find(x => x.id == model.input.createProduct.yarnTypes)

  for (let i = 0; i < assortmentObject.colorIds.length; i++) {
    for(let j = 0; j < model.input.createProduct.colorAltIds.length; j++)
    if (model.input.createProduct.colorAltIds[j] === assortmentObject.colorIds[i]){
      selected = true;
    }
      
    html += `<option  value="${assortmentObject.colorIds[i]}" ${selected ? "selected" : ""}>${getColorAlt(assortmentObject.colorIds[i])}</option>`;
    selected = false;
  }




  html += '</select>';
  return html;
}

function changedColorAltProductViewInput(element) {
  model.input.createProduct.colorAltIds = [];
  for (let i = 0; i < element.options.length; i++) {
    if (element.options[i].selected == true)
      model.input.createProduct.colorAltIds.push(Number(element.options[i].value))
  }
}

