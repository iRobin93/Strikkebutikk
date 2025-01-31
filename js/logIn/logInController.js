function logIn() {
  let usernameInput = model.input.logIn.username;
  let passwordInput = model.input.logIn.password;
  const username = model.data.admin.username;
  const password = model.data.admin.password;
   
  if (usernameInput === username && passwordInput === password) {
    model.app.isAdmin = true;
    model.app.page = "addProducts";
    model.input.logIn.username = "";
    model.input.logIn.password = "";
    updateView();
  } else {
    alert("Brukernavn og passord matcher ikke!");
  }
}
