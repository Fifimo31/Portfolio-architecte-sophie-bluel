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
