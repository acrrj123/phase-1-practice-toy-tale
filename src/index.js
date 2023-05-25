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

// Fetch Andy's Toys from the server. 

fetch('http://localhost:3000/toys')
.then(resp => resp.json())
//.then(data => console.log(data))
.then(data => data.forEach(toy => makeCard(toy)))

// With the response data, make a <div class="card"> for each toy and add it to the toy-collection div. Then, add toy info to the card.

function makeCard(toy) {
    let divToys = document.querySelector('#toy-collection');
    let card = document.createElement('div');
    card.className = 'card';
    card.innerHTML = `
    <h2>${toy.name}</h2>
    <img src="${toy.image}" class="toy-avatar">
    <p>${toy.likes}</p>
    <button class="like-btn" id=${toy.id}>Like ❤️</button>`
    divToys.appendChild(card)
    //console.log(card)
  }




    
