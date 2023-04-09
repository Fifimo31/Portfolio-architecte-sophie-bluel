fetch("http://localhost:5678/api/works")
  .then(response => {
    console.log(response.ok)
    return response.json();
})
.then(data => {
    displayData(data)
  })

  const displayData = (data) => {
    const gallery = document.querySelector("#portfolio .gallery")
    for  ( let item of data){
      console.log(item.category)
      const img = 
      `<figure>
      <img src="${item.imageUrl}" alt="Abajour Tahina">
      <figcaption>${item.title}</figcaption>
      </figure>`;
      gallery.insertAdjacentHTML('beforeend',img)
    }
  }
  

const allBtn = document.querySelector(".btn button");
const objetBtn = document.querySelector(".btn .objet");
const appartementBtn = document.querySelector(".btn .appartement");
const hrBtn = document.querySelector(".btn .hotelRestau");

const monSet = new Set();
monSet.add(1);
monSet.add(2);
monSet.add(3);

const objet = {id: 1};
const appartements = {id: 2};
const hotelRestau = {id: 3};
monSet.add(objet);
monSet.add(appartements);
monSet.add(hotelRestau);
console.log(monSet)
for (let item of monSet) console.log(item);

allBtn.addEventListener("click", () => {
  
});


objetBtn.addEventListener("click", () => {

});
console.log(objetBtn)

appartementBtn.addEventListener("click", () => {
  
});

hrBtn.addEventListener("click", () => {

});



