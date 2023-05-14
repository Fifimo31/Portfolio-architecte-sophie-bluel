//cibler le formulaire
const formAdmin = document.querySelector ("#formAdmin");
console.log (formAdmin)
// gestionnaire d'événement addeventlisterner tipe submit
//
formAdmin.addEventListener("submit",(e)=>{
  e.preventDefault();
  const username = e.target.username.value;
  const password = e.target.password.value;
  const user =
    {
      username: username,
      password: password
    }
   handleFormSubmit (user)
  
  console.log(user)
})


const handleFormSubmit = (user) => {

  fetch('http://localhost:5678/api/users/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(user)
  })
  .then(response => {
    if (response.ok) {
    } 
  })
  .catch(error => {
    // affiche un message d'erreur en cas d'erreur de connexion au serveur
    console.error(error);
    const errorMessage = document.getElementById('error-message');
    errorMessage.textContent = 'Une erreur est survenue lors de la connexion. Veuillez réessayer plus tard.';
  });
}
