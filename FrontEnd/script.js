const token = sessionStorage.getItem('token');
const dataUrl = "http://localhost:5678/api/works";// ce code permet de récupérerer l'url de mon api
let allData = [];//crée une variable appelée allDataet lui attribue une valeur initiale vide, représentée par un tableau vide ( []).
                //Cette déclaration est utile pour initialiser une variable qui sera utilisée pour stocker des données ou accumuler des valeurs au fur et à mesure
                // de l'exécution de votre code. Le tableau vide permet de prévoir un conteneur où vous pourrez ajouter des éléments proposés.

const loadData = async (dataUrl) => {//Ce code définit une fonction loadData et prend un paramètre dataUrl async=non blocant
                                    //La fonction loadData est déclarée avec le mot-clé async, ce qui indique qu'elle sera asynchrone et qu'elle retournera une promesse.
  fetch(dataUrl)     // La fonction fetch()renvoie une promesse qui représente la réponse de la requête
  .then(response => {//Ensuite, nous utilisons la méthode .then()pour attacher un gestionnaire de réussite à cette promesse
                    //Le gestionnaire de réussite est la fonction fléchée response => { ... }qui prend comme argument la réponse de la requête
  console.log(response.ok)//À l'intérieur de ce gestionnaire, nous effectuons un console.log(response.ok) pour afficher dans la console la propriété ok de l'objet response.
                          // La propriété ok est un booléen qui indique si la réponse de la requête a été réussie ( true) ou non ( false).
  return response.json();// return permet d'obtenir le résultat à la réponse
  })
  .then(data => {// la méthode then() est utilisé pour gérer la réponse de la requête 
                  //Le paramètre data représente les données récupérées de la requête
  sessionStorage.setItem('data', JSON.stringify(data))// les éléments de l'API sont stocké dans data 
                                                      // sessionStorage permet de stoker une paire clé-valeur temporairement dans la session stokage du navigateur
                                                        //setItem  permet de stocker des données importantes dans sessionStorage
                                                        //stringify est utilisée pour convertir les données JavaScript ( data) en une chaîne de caractères JSON
  allData = data;
  displayData(data);//displayData est appelé avec data comme argument pour afficher le contenue de data 
  modalimg(data)
  })
}
loadData(dataUrl)//loadData est appelé avec dataUrl comme argument pour afficher le contenue de l'url


const displayData = (data, categoryId = 0) => {
  const gallery = document.querySelector("#portfolio .gallery");
  let filteredData = data;

  if (categoryId !== 0) {
    filteredData = data.filter(item => item.category.id === categoryId);
  }

  gallery.innerHTML = "";

  for (let item of filteredData) {
    const img = `<figure><img src="${item.imageUrl}" alt="${item.title}"><figcaption>${item.title}</figcaption></figure>`;
    gallery.insertAdjacentHTML('beforeend', img);
  }
};


//fonction loadCatégori
const loadCatégories = () => {
  fetch("http://localhost:5678/api/categories")
  .then(response => {
  console.log(response.status)
  return response.json();
  })
  .then(categories => {
    btnCategories(categories);
  })
}


const btnCategories = (categories) => {
  console.log(categories)
  const category = document.querySelector("#portfolio .btn")
  for (let item of categories) {
    console.log(item.name)
    const button =
      `<button data-idcat="${item.id}">${item.name}</button>`
    category.insertAdjacentHTML('beforeend', button)
  }
  const buttonTous = `<button data-idcat="0">Tous</button>`
  category.insertAdjacentHTML('afterbegin', buttonTous)
  const buttonsCat = document.querySelectorAll("#portfolio .btn button")
  const data = JSON.parse(sessionStorage.getItem('data'));
  console.log(data[0].title)//

  for (let buttonCat of buttonsCat) {// buttonCat permet de parcourir tout les bouttons

    buttonCat.addEventListener("click", (e) => {

      const idCat = parseInt(e.target.dataset.idcat);//parseInt=transformer une chaine de caractère en un nombre, e=evenement, target=cible, dataset= c'est un objet qui récupére tous les attribut qui commence par "data-...", et récupére l'idcat
      displayData(data, idCat)
    })

  }
  
}


const creatBackOffice = () => {
  const edit = document.querySelector("#portfolio .editProjet");
  const editimg = document.querySelector("figure .edit")
    if (token) {
      edit.insertAdjacentHTML('afterbegin', `<i class="fa-sharp fa-regular fa-pen-to-square"></i><p>modifier</p>`);
      editimg.insertAdjacentHTML('afterbegin', `<i class="fa-sharp fa-regular fa-pen-to-square"></i><p>modifier</p>`)
      
    }
}

if (!token){
  loadCatégories();
} else {
  creatBackOffice();
}


const openModalForm = (e) => {
  e.preventDefault();
  const targetHref = e.currentTarget.getAttribute('href'); // Utiliser 'currentTarget' pour cibler l'élément a
  const target = document.querySelector(targetHref);
  target.style.display = null;
};
document.querySelectorAll('.js-modalForm').forEach(modalFormTrigger => {
  modalFormTrigger.addEventListener('click', openModalForm);
});

// Sélectionne le premier élément avec la classe 'arrow-left'
const returnIcon = document.querySelector('.arrow-left');
if (returnIcon) {
  // Ajoute un gestionnaire d'événement 'click' à l'icône de retour
  returnIcon.addEventListener('click', (event) => {
    // Utilise `event.currentTarget` pour cibler correctement l'élément qui a déclenché l'événement
    const modal = event.currentTarget.closest('.modal'); // Trouve le parent le plus proche avec la classe 'modal'
    if (modal) {
      modal.style.display = 'none'; // Masque le modal si trouvé
    }
  });
}


document.querySelectorAll('.close-modal').forEach(closeIcon => {
  closeIcon.addEventListener('click', (event) => {
    // Sélectionne tous les éléments avec la classe 'modal'
    const modals = document.querySelectorAll('.modal');
    // Itère sur chaque modal pour appliquer une modification
    modals.forEach(modal => {
      // Par exemple, pour masquer tous les modals
      modal.style.display = 'none';
    });
  });
});


const modalgallery = document.querySelector('aside .modal-wrapper .gallery1');

const modalimg = (data) => {
  data.forEach((item, index) => {
    const img = `
      <figure data-index="${index}">
        <img src="${item.imageUrl}" alt="Abajour Tahina">
        <div class="framIcon trashCan"></div>
        <figcaption>éditer</figcaption>
      </figure>
    `;
    modalgallery.insertAdjacentHTML('beforeend', img);
  });

  modalgallery.addEventListener('click', (event) => {
    if (event.target.classList.contains('trashCan')) {
      const figureElement = event.target.closest('figure');
      const dataIndex = parseInt(figureElement.getAttribute('data-index'));
      const imageElement = figureElement.querySelector('img');
      const imageUrl = imageElement.getAttribute('src');
      deleteImage(dataIndex, imageUrl);
    }
  });
};


const deleteImage = (dataIndex, imageUrl) => {
const token = sessionStorage.getItem('token');
console.log(dataIndex)

  fetch("http://localhost:5678/api/works/1" + encodeURIComponent(imageUrl), {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    },
  })
  .then(response => {
    if (!response.ok) {
      throw new Error(`La suppression a échoué avec le code d'erreur : ${response.status}`);
    }
    // Gérer la réussite de la suppression
    const figureElement = modalgallery.querySelector(`figure[data-index="${dataIndex}"]`);
    if (figureElement) {
      figureElement.remove(); // Supprimez la figure de l'image
    }
  })
  
};


const previewFile = () => {
  const previewContainer = document.querySelector('#ajouterPhoto');
  const fileInputElement = document.querySelector('input[type=file]');
  const file = fileInputElement.files[0];

  if (file) {
    const reader = new FileReader();
    reader.onloadend = function() {
      let imgElement = previewContainer.querySelector('img');
      if (!imgElement) {
        imgElement = document.createElement('img');
        previewContainer.appendChild(imgElement);
      }
      imgElement.src = reader.result;
    };
    reader.readAsDataURL(file);
  } else {
    const imgElement = previewContainer.querySelector('img');
    if (imgElement) {
      imgElement.src = "";
    }
  }
}

document.getElementById('uploadForm').addEventListener('submit', function(event) {
  event.preventDefault();

  const formData = new FormData(event.target);
  formData.append('title', document.getElementById('titre').value);
  formData.append('categoryId', parseInt(document.getElementById('categoryId').value, 10));
  formData.append("image", document.querySelector('input[type=file]').files[0]);

  const request = new XMLHttpRequest();
  request.open("POST", 'http://localhost:5678/api/works');
  request.onload = () => {
    if (request.status == 200) {
      console.log('Soumission réussie:', request.responseText);
      alert('Image et données enregistrées avec succès !');
    } else {
      throw new Error('Échec de la soumission');
    }
  };
  request.onerror = () => {
    console.error('Erreur lors de la soumission des données:', request.statusText);
    alert('Erreur lors de l\'envoi des données');
  };
  request.send(formData);
});


/*function previewFile() {
  const previewContainer = document.querySelector('#ajouterPhoto'); // Assurez-vous que cet ID est correct
  const file = document.querySelector('input[type=file]').files[0]; // Obtient le fichier depuis l'input

  if (file) {
    const reader = new FileReader();
    
    reader.onloadend = function() {
      // Vérifie si une image est déjà présente dans le conteneur
      let imgElement = previewContainer.querySelector('img');
      if (!imgElement) {
        // Si aucune image n'existe, crée une nouvelle
        imgElement = document.createElement('img');
        previewContainer.appendChild(imgElement);
      }
      imgElement.src = reader.result; // Affiche l'image lue
    };
    
    reader.readAsDataURL(file);
  } else {
    // Efface l'image si aucun fichier n'est sélectionné
    const imgElement = previewContainer.querySelector('img');
    if (imgElement) {
      imgElement.src = "";
    }
  }
}


document.getElementById('uploadForm').addEventListener('submit', function(event) {
  event.preventDefault();

  const formData = new FormData();
  
  // Assure-toi que 'title' et 'category' correspondent aux attentes de l'API
  formData.append('title', document.getElementById('titre').value);
  // Convertis l'ID de catégorie en nombre si nécessaire
  formData.append('categoryId', document.getElementById('categoryId').value);
  formData.append("image", fileInputElement.files[0]);
  // Pour afficher les valeurs de FormData dans la console
  

  
  const content = `<figure data-index="${index}">
                      <img src="${item.imageUrl}" alt="Abajour Tahina">
                      <div class="framIcon trashCan"></div>
                      <figcaption>éditer</figcaption>
                    </figure>';`
 
  const blob = new Blob([content], { type: "text/xml" });
  formData.append("webmasterfile", blob);
  const request = new XMLHttpRequest();

  request.open("POST", 'http://localhost:5678/api/works');
  request.send(formData);
  for (var pair of formData.entries()) {
    console.log(pair[0]+ ': ' + pair[1]); 
  }*/
/*
  UrlData = 'http://localhost:5678/api/works' 
  console.log(UrlData)
  fetch(UrlData, {
      method: 'POST',
      body: formData,
      headers: {
          'Authorization': `Bearer ${sessionStorage.getItem('token')}` // Assure-toi que le token est correctement géré
      }
  })
  .then(response => {
      if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
      }
      return response.json();
  })
  .then(data => {
      console.log('Success:', data);
      alert('Image et données enregistrées avec succès !');
  })

  .catch(error => {
      console.error('Error:', error);
      alert('Erreur lors de l’envoi des données');
  });
});*/

