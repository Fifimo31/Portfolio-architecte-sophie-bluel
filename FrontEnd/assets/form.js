//cibler le formulaire
const formAdmin = document.querySelector("form");

const emailField =
  `<label for="email">E-mail</label><br>
  <input type="email" id="email" name="email"><br>`;
formAdmin.insertAdjacentHTML('beforeend', emailField);

const loginField =
  `<label for="login">Mot de passe</label><br>
  <input type="password" id="login" name="login">`;
formAdmin.insertAdjacentHTML('beforeend', loginField);

const submitButton =
  `<input type="submit" value="Se connecter">`;
formAdmin.insertAdjacentHTML('beforeend', submitButton);

const forgotPasswordLink =
  `<a href="#">Mot de passe oublié</a>`;
formAdmin.insertAdjacentHTML('beforeend', forgotPasswordLink);

// Gestionnaire d'événement pour le bouton de soumission
formAdmin.addEventListener("submit", (e) => {
  e.preventDefault(); // Prevent form submission

  const email = document.getElementById('email').value;
  const login = document.getElementById('login').value;

  if (email === "sophie.bluel@test.tld" && login === "S0phie") {
    window.location.href = "http://127.0.0.1:5501/FrontEnd/index.html";
  } else {
    const errorMessage = "Invalid email or password";
    displayMessage(errorMessage);
  }
});

function displayMessage(message) {
  const errorContainer = document.getElementById('errorContainer');
  errorContainer.textContent = message;
}

const user = "http://localhost:5678/api/users/login";

fetch(user, {
  headers: {
    'Accept': 'application/json',
    'Content-Type': 'application/json'
  },
  method: "POST",
  body: JSON.stringify(user)
})
  .then((res) => { console.log(res) })
  .catch((res) => { console.log(res) });



