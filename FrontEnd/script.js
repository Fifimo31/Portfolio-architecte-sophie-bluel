fetch("http://localhost:5678/api/works")
  .then(response => {
    console.log(response.ok)
    return response.json();
})
.then(data => {
    displayData(data)
  })

  const displayData = (data, idCat = 0) => {
    const gallery = document.querySelector("#portfolio .gallery")
    for  ( let item of data){
      const img = 
      `<figure>
      <img src="${item.imageUrl}" alt="Abajour Tahina">
      <figcaption>${item.title}</figcaption>
      </figure>`;
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
    displayCategory(categories)
  })

  const displayCategory = (categories) => {
    console.log(categories)
  const category = document.querySelector("#portfolio .btn")
  for ( let item of categories){
    console.log(item.name)
    const button =
    ` <button data-idcat = ${item.id}>${item.name}</button>
			`
    category.insertAdjacentHTML('beforeend',button)
  }
  const buttonTous = `<button data-idcat = "0">Tous</button>`
  category.insertAdjacentHTML('afterbegin', buttonTous)
  const buttonsCat = document.querySelectorAll("#portfolio .btn button")
  console.log(buttonsCat)
  for ( let buttonCat of buttonsCat){
    const idCat = buttonCat.dataset.idcat;
    console.log(idCat)
  }
  
}




