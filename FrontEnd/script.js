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

const displayData = (data, idCat = 0) => {// const displayData est une fonction qui retourne les images
  console.log(data)
  const gallery = document.querySelector("#portfolio .gallery")// on a récupérer l'ID est la class avec querySelector
  const filteredData = idCat === 0 ? allData : allData.filter(item => item.categoryId === idCat); //filtrage des donner par rapport a la catégoryId
                                                                                                  //le "?" si la valeur est vrais et les ":" si la valeur est fausse
  for ( let item of filteredData){// la boucle for of et utilisé pour parcourir des élément itérable
  console.log()
  const img =
  `<figure> <img src="${item.imageUrl}" alt="Abajour Tahina"> <figcaption>${item.title}</figcaption> </figure>`;
  gallery.insertAdjacentHTML('beforeend',img)// j'ai récupérer les éléments à partir de fiteredData en parcourant la boucle for 
    }
}
const modalimg = (data) => {
  const modalgallery = document.querySelector('aside .modal-wrapper .gallery1');

  modalgallery.innerHTML = '';

  data.forEach((item) => {
    const img = `
      <figure>
        <img src="${item.imageUrl}" alt="Abajour Tahina">
        <figcaption>éditer</figcaption>
        <i class="trashCan"></i>
      </figure>
    `;
    modalgallery.insertAdjacentHTML('beforeend', img);
  });
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

