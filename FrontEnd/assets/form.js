const formAdmin = document.querySelector("form");

const emailField = // champ d'email
  `<label for="email">E-mail</label><br>
  <input type="email" id="email" name="email"><br>`;
formAdmin.insertAdjacentHTML('beforeend', emailField);

const loginField = // champ de connexion
  `<label for="login">Mot de passe</label><br>
  <input type="password" id="login" name="login">`; // "password" permet de masquer le mot de passe
formAdmin.insertAdjacentHTML('beforeend', loginField);

const submitButton = // (submit = soumettre)
  `<input type="submit" value="Se connecter">`;
formAdmin.insertAdjacentHTML('beforeend', submitButton);

const forgotPasswordLink = // lien de mot de passe oublié
  `<a href="#">Mot de passe oublié</a>`;
formAdmin.insertAdjacentHTML('beforeend', forgotPasswordLink);

// Gestionnaire d'événement pour le bouton de soumission
formAdmin.addEventListener("submit", (e) => {
  e.preventDefault(); // empêche la soumission du formulaire avant la transmission des informations demander 

  const email = document.getElementById('email').value;//value est utilisé pour accéder à la valeur actuelle de cet élément, c'est-à-dire le texte saisi par l'utilisateur
  const login = document.getElementById('login').value;

  if (email === "sophie.bluel@test.tld" && login === "S0phie") {
    window.location.href = "http://127.0.0.1:5501/FrontEnd/index.html";
  } else {
    const errorMessage = "Invalid email or password";
    displayMessage(errorMessage);
    console.log(errorMessage)
  }
});


  const data = "http://localhost:5678/api/users/login";
  const submitForm = async(data) => {
  
  fetch(data, {
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    method: "POST",
    body: JSON.stringify(data)
  })
    .then((res) => {
      console.log(res);})
    
      .catch((error) => {
      console.log(error);});
};



