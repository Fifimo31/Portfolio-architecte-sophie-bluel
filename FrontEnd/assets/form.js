const formAdmin = document.querySelector("form");

const emailField = document.querySelector("#email")// emailField = champ d'email
emailField.innerHTML = ""; 

const loginField = document.querySelector("#login")// loginField = champ de connexion
loginField.innerHTML = "";

const submitButton = document.querySelector("input[type='submit']") // (submit = soumettre)
submitButton.innerHTML = "";

const forgotPasswordLink = document.querySelector("a") // lien de mot de passe oublié
 forgotPasswordLink.innerHTML = "";

const url = "http://localhost:5678/api/users/login";
  const validForm = async(url, data) => {
  
  fetch(url, {
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
      displayData(data)
};

validForm(url)
// Gestionnaire d'événement pour le bouton de soumission
formAdmin.addEventListener("submit", (e) => {
  e.preventDefault(); // empêche la soumission du formulaire avant la transmission des informations demander 

  const email = document.getElementById('email').value;//value est utilisé pour accéder à la valeur actuelle de cet élément, c'est-à-dire le texte saisi par l'utilisateur
  const login = document.getElementById('login').value;

  const data = {
    email: email,
    password: login
  }
  console.log(data)
  const response = validForm(url, data)
  console.log(response)
  if (email === "sophie.bluel@test.tld" && login === "S0phie") {
    window.location.href = "http://127.0.0.1:5501/FrontEnd/index.html";

  } else {
    const errorMessage = "Invalid email or password";
    displayMessage(errorMessage);
    console.log(errorMessage)
  }

});


