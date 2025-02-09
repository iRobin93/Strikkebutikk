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
  <img onclick="model.app.page = 'main'; updateView();" style="width: 100px; height: 100px; cursor: pointer;" src="source/img/alpakka.jpg">
  <input id="searchNavBar" class="searchNavBar" type="text">
  <div class="button-container">
        <button onclick="model.app.page = 'shoppingCart'; updateView();" id="myButton" class="button">
    Handlevogn
    <span id="myAlertNumber" ${displayNone} class="alert-number1">${model.input.shoppingCart.shoppingCartLines.length}</span>
  </button>
    </div>
  <div><p onclick="model.app.page = 'logIn'; if(model.app.isAdmin) {model.app.isAdmin = false; model.app.page = 'main'} updateView();" class="hover">${model.app.isAdmin ? "Logg Ut" : "Logg Inn"}</p></div>
  </div>
  `;

  return html;
}


function bottomNavBar() {
  let html = /*HTML*/ `
  <nav class="bottomNavBarContainer">
    <ul>
      <li><p onclick="model.app.page = 'main'; updateView();" class="hover">Forsiden</p></li>
      <li><p onclick="model.app.page = 'overview'; updateView();" class="hover">Produktoversikten</p></li>
      <li><p onclick="model.app.page = 'productSite'; updateView();" class="hover">Produkt</p></li>
      <li><p onclick="model.app.page = 'designProduct'; updateView();" class="hover">Design ditt produkt</p></li>
      <li><p onclick="model.app.page = 'aboutMe'; updateView();" class="hover">Om Meg</p></li>
    </ul>
  </nav>
  `;
  return html;
}

function showAdminNavBar() {
  // Count unread comments (where read = false)
  let unreadCommentsCount = model.data.comments.filter(comment => !comment.read).length;

  // Hide the alert if there are no unread comments
  let displayNone = unreadCommentsCount > 0 ? "" : "style='display: none;'";

  let html = /*HTML*/ `
  <nav class="adminNavBarContainer">
    <ul>
      <li><p onclick="model.app.page = 'sortiment'; updateView();" class="hover">Sortiment</p></li>
      <li><p onclick="getCommentsFromSQL(); model.app.page = 'comments'; updateView();" class="hover">Kommentarer
        <span id="commentsAlertNumber" ${displayNone} class="alert-number2">${unreadCommentsCount}</span>
      </p></li>
      <li><p onclick="model.app.page = 'addProducts'; updateView();" class="hover">Legg til Produkt</p></li>
    </ul>
  </nav>
  `;

  app.innerHTML += html;
  return html;
}