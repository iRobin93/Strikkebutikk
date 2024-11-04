function logIn() {
  let usernameInput = model.input.logIn.username;
  let passwordInput = model.input.logIn.password;
  const username = model.data.admin.username;
  const password = model.data.admin.password;

  if (loginVar == "Logg Ut") {
    loginVar = "Logg Inn";
    updateView();
  }

  if (usernameInput === username && passwordInput === password) {
    model.app.isAdmin = true;
    model.app.page = "addProducts";
    usernameInput = "";
    passwordInput = "";
    loginVar = "Logg Ut";
    updateView();
  } else {
    alert("Brukernavn og passord matcher ikke!");
  }
}
