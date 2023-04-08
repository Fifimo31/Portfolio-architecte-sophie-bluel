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
  
const filterData = (category, data) => {
  return data.filter((item) => item.category === category);
};

const allBtn = document.querySelector(".btn button");
const objetBtn = document.querySelector(".btn .objet");
const appartementBtn = document.querySelector(".btn .appartement");
const hrBtn = document.querySelector(".btn .hotelRestau");

allBtn.addEventListener("click", () => {
  fetch("http://localhost:5678/api/works")
    .then((response) => {
      console.log(response.ok);
      return response.json();
    })
    .then((data) => {
      displayData(data);
    });
});


objetBtn.addEventListener("click", () => {
  fetch("http://localhost:5678/api/works")
    .then((response) => {
      console.log(response.ok);
      return response.json();
    })
    .then((data) => {
      const filteredData = filterData("Objets", data);
      displayData(filteredData);
    });
});
console.log(objetBtn)

appartementBtn.addEventListener("click", () => {
  fetch("http://localhost:5678/api/works")
    .then((response) => {
      console.log(response.ok);
      return response.json();
    })
    .then((data) => {
      const filteredData = filterData("Appartement", data);
      displayData(filteredData);
    });
});

hrBtn.addEventListener("click", () => {
  fetch("http://localhost:5678/api/works")
    .then((response) => {
      console.log(response.ok);
      return response.json();
    })
    .then((data) => {
      const filteredData = filterData("Hôtel & restaurants", data);
      displayData(filteredData);
    });
});

