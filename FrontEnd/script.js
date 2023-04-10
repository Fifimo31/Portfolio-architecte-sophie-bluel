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
      console.log(item)
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
    console.log(response.ok)
    return response.json();
})


const displayCategory = (data) => {
  const category = document.querySelector("#portfolio .btn")
  for ( let item of data){
    console.log(item.category)
    const button =
    ` <button>Tous</button>
			<button class="objet">Objets</button>
			<button class="appartement">Appartement</button>
			<button class="hotelRestau">Hôtel & restaurants</button>`
    category.insertAdjacentHTML('beforeend',button)
  }
}




