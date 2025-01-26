function updateViewLogIn() {
  app.innerHTML += /*HTML*/ ` 
  <div id="login-form">
  <h2>Logg Inn</h2>

  <div class="form-group">
    <label for="logInInput">Brukernavn:</label>
    <input
    style="width: 200px;"
      onchange="model.input.logIn.username = this.value"
      type="text"
      id="logInInput"
      placeholder="Brukernavn"
    />
  </div>

  <div class="form-group">
    <label for="logInPassword">Passord:</label>
    <input
     style="width: 200px;"
      onchange="model.input.logIn.password = this.value"
      type="password"
      id="logInPassword"
      placeholder="Passord"
    />
  </div>

  <button  style="width: 200px;" onclick="logIn()" class="submit-btn">Logg Inn</button>
</div>
    `;
}
