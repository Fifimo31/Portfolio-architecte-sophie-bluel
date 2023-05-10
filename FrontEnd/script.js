const dataUrl = "http://localhost:5678/api/works";
let allData = [];

const loadData = async (dataUrl) => {
fetch(dataUrl)
.then(response => {
console.log(response.ok)
return response.json();
})
.then(data => {
sessionStorage.setItem('data', JSON.stringify(data))
allData = data;
displayData(data);
})
}
loadData(dataUrl)

const displayData = (data, idCat = 0) => {
console.log(idCat)
const gallery = document.querySelector("#portfolio .gallery")
gallery.innerHTML = "";
const filteredData = idCat === 0 ? allData : allData.filter(item => item.categoryId === idCat);
for ( let item of filteredData){
console.log()
const img =
`<figure> <img src="${item.imageUrl}" alt="Abajour Tahina"> <figcaption>${item.title}</figcaption> </figure>`;
gallery.insertAdjacentHTML('beforeend',img)
  }
}
fetch("http://localhost:5678/api/categories")
.then(response => {
console.log(response.status)
return response.json();
})
.then(categories => {
// console.log(categories)
btnCategories(categories)
})

const btnCategories = (categories) => {
console.log(categories)
const category = document.querySelector("#portfolio .btn")
for ( let item of categories){
console.log(item.name)
const button =
`<button data-idcat="${item.id}">${item.name}</button>` 
category.insertAdjacentHTML('beforeend',button)
}
const buttonTous = `<button data-idcat="0">Tous</button>`
category.insertAdjacentHTML('afterbegin', buttonTous)
const buttonsCat = document.querySelectorAll("#portfolio .btn button")
const data = JSON.parse(sessionStorage.getItem('data'))
console.log(data)

for ( let buttonCat of buttonsCat){
  
 buttonCat.addEventListener("click",(e)=>{

    const idCat = parseInt(e.target.dataset.idcat);
    displayData(data, idCat)
  })
  
}  
}
