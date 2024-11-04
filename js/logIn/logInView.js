function updateViewLogIn() {
  app.innerHTML += /*HTML*/ ` 
  <input
  onchange="model.input.logIn.username = this.value"
  type="text"
  id="logInInput"
  placeholder="Brukernavn"
/>
<input
  onchange="model.input.logIn.password = this.value"
  type="password"
  id="logInPassword"
  placeholder="Passord"
/>

<button onclick="logIn()">Logg Inn </button>
    `;
}
