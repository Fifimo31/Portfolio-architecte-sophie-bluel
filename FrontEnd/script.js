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

const openModal = (e) => {
  e.preventDefault();
  const targetHref = e.currentTarget.getAttribute('href'); // Utiliser 'currentTarget' pour cibler l'élément a
  const target = document.querySelector(targetHref);
  target.style.display = null;
};
document.querySelectorAll(".js-modal").forEach(a => {
a.addEventListener('click', openModal);
});

    // Gérer la fermeture du modal
const closeModalIcon = document.querySelector('.close-modal');
closeModalIcon.addEventListener('click', () => {
const modal = document.querySelector('.modal');
modal.style.display = 'none';
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
modalgallery.addEventListener('click', (event) => {
  if (event.target.classList.contains('trashCan')) {
    const figureElement = event.target.closest('figure'); // Trouver le parent <figure> le plus proche
    const dataIndex = parseInt(figureElement.getAttribute('data-index'));
    const imageElement = figureElement.querySelector('img');
    const imageUrl = imageElement.getAttribute('src');
    deleteImage(dataIndex, imageUrl);
  }
});
