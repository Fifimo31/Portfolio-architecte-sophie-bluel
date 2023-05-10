function handleFormSubmit(event) {
  event.preventDefault(); // empêche le formulaire de se soumettre automatiquement

  // récupère les informations de connexion de l'utilisateur
  const username = document.getElementById('username').value;
  const password = document.getElementById('password').value;

  // envoie une requête POST à l'API pour vérifier les informations de connexion
  fetch('http://localhost:5678/api/users/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ username, password })
  })
  .then(response => {
    if (response.ok) {
      // la connexion a réussi, redirige l'utilisateur vers la page d'accueil
      window.location.href = '/index.html';
    } else {
      // la connexion a échoué, affiche un message d'erreur
      const errorMessage = document.getElementById('error-message');
      errorMessage.textContent = 'Nom d\'utilisateur ou mot de passe incorrect';
    }
  })
  .catch(error => {
    // affiche un message d'erreur en cas d'erreur de connexion au serveur
    console.error(error);
    const errorMessage = document.getElementById('error-message');
    errorMessage.textContent = 'Une erreur est survenue lors de la connexion. Veuillez réessayer plus tard.';
  });
}
const users = [
  {
    email: 'hawa31@yahoo.fr',
    password: '1234'
  },
  // les autres comptes utilisateur iront ici
];
app.post('/api/users/login', (req, res) => {
  const { email, password } = req.body;

  const user = users.find(user => user.email === email && user.password === password);

  if (!user) {
    // les informations d'identification sont incorrectes, retourne une erreur 401 (Non autorisé)
    return res.status(401).json({ message: 'Les informations d\'identification fournies sont incorrectes' });
  }

  // les informations d'identification sont correctes, retourne un message de succès
  return res.status(200).json({ message: 'La connexion a réussi' });
});
