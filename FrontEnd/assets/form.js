const formAdmin = document.querySelector("form");

// Gestionnaire d'événement pour le bouton de soumission
formAdmin.addEventListener("submit", (e) => {
  e.preventDefault(); // empêche la soumission du formulaire avant la transmission des informations demander 

  const email = document.getElementById('email').value;//value est utilisé pour accéder à la valeur actuelle de cet élément, c'est-à-dire le texte saisi par l'utilisateur
  const login = document.getElementById('login').value;

  const data = {
    email: email,
    password: login
  }

  const url = "http://localhost:5678/api/users/login";
  const validForm = async(url, data) => {
  
  fetch(url, {
    method: "POST",
    body: JSON.stringify(data),
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json; charset=UTF-8',
    },
    
    
  })
    .then((response) => response.json())
    .then((json) => {
      console.log(json)
      sessionStorage.setItem('token', json.token)
      if(json.token) {
      window.location.href = "http://127.0.0.1:5501/FrontEnd/index.html" } 
      else {json.message} 

    });
    displayToken(token)
    .catch(Error) 
  }

  console.log(data)
  const response = validForm(url, data)
  console.log(response)
})


