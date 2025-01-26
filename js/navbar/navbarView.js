function showNavBar() {
  let html = "";
  html += /*HTML*/ ` 
 ${topNavBar()}
 ${bottomNavBar()}
 `;
  app.innerHTML = html;
  return html;
}

function topNavBar() {

  let displayNone = "style='Display: none;'";
  if(model.input.shoppingCart.shoppingCartLines.length > 0)
    displayNone = "";
  let html = /*HTML*/ `
  <div class="topNavBarContainer">
  <img style="width: 100px; height: 100px;" src="source/img/alpakka.jpg">
  <input id="searchNavBar" class="searchNavBar" type="text">
  <div class="button-container">
        <button onclick="model.app.page = 'shoppingCart'; updateView();" id="myButton" class="button">
    Handlevogn
    <span id="myAlertNumber" ${displayNone} class="alert-number">${model.input.shoppingCart.shoppingCartLines.length}</span>
  </button>
    </div>
  <div><p onclick="model.app.page = 'logIn'; if(model.app.isAdmin) {model.app.isAdmin = false; model.app.page = 'main'} updateView();" class="hover">${model.app.isAdmin ? "Logg Ut" : "Logg Inn"}</p></div>
  </div>
  `;

  return html;
}

function bottomNavBar() {
  let html = /*HTML*/ `
  <div class="bottomNavBarContainer">
  <div><p onclick="model.app.page = 'main'; updateView();" class="hover">Forsiden</p></div>
  <div><p onclick="model.app.page = 'overview'; updateView();" class="hover">Produktoversikten</p></div>
  <div><p onclick="model.app.page = 'productSite'; updateView();" class="hover">Produkter</p></div>
  <div><p onclick="model.app.page = 'main'; updateView();" class="hover">Design ditt produkt</p></div>
  <div><p onclick="model.app.page = 'addProducts'; updateView();" class="hover">Om Meg</p></div>
  </div>
    `;
  return html;
}

function showAdminNavBar() {
  let html = /*HTML*/ `
  <div class="bottomNavBarContainer">
  <div><p onclick="model.app.page = 'sortiment'; updateView();" class="hover">Sortiment</p></div>
  <div><p onclick="model.app.page = 'addProducts'; updateView();" class="hover">Legg til Produkt</p></div>
  </div>
    `;

  app.innerHTML += html;
  return html;
}
