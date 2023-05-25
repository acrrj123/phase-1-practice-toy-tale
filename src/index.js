let addToy = false;

document.addEventListener("DOMContentLoaded", () => {
  const addBtn = document.querySelector("#new-toy-btn");
  const toyFormContainer = document.querySelector(".container");
  addBtn.addEventListener("click", () => {
    // hide & seek with the form
    addToy = !addToy;
    if (addToy) {
      toyFormContainer.style.display = "block";
    } else {
      toyFormContainer.style.display = "none";
    }
  });
});

// Fetch Andy's Toys from the server. With the response data, make a <div class="card"> for each toy and add it to the toy-collection div.

fetch('http://localhost:3000/toys')
.then(resp => resp.json())
//.then(data => console.log(data))
.then(data => makeCard(data))

function makeCard(arrayToys) {
  let divToys = document.querySelector('#toy-collection');
  arrayToys.forEach(toy => {
    let card = document.createElement('div');
    card.className = 'card';
    divToys.appendChild(card)
  })
}

// card.innerHTML = `
    // <h2>${toy.name}</h2>
    // <img src="${toy.image}" class="toy-avatar">
    // <p>${likes}</p>
    // <button class="like-btn" id=${id}>Like ❤️</button> 
    //
