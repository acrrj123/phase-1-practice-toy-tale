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
.then(data => data.forEach(toy => makeCard(toy)))

// With the response data, make a <div class="card"> for each toy and add it to the toy-collection div. Then, add toy info to the card.

function makeCard(toy) {
    let divToys = document.querySelector('#toy-collection');
    let card = document.createElement('div');
    card.className = 'card';

    card.innerHTML = `
    <h2>${toy.name}</h2>
    <img src="${toy.image}" class="toy-avatar">
    <p>${toy.likes} likes</p>
    <button class="like-btn" id=${toy.id}>Like ❤️</button>`
    
    const likeBtn = card.querySelector('.like-btn')
    likeBtn.addEventListener('click', () => {
      toy.likes+= 1
      card.querySelector('p').textContent = toy.likes
      updateLikes(toy)
    })
  
    divToys.appendChild(card)
  }

// Add a new toy. When a user submits the toy form, send a POST request to add the new toy to Andy's Toy Collection. If the post is successful, the toy should be added to the DOM without reloading the page.

const form = document.querySelector('.add-toy-form')

form.addEventListener('submit', handleSubmit)

function handleSubmit (e) {
  e.preventDefault()
  //console.log(e.target.name)
  let toyObj = {
    name: e.target.name.value,
    image: e.target.image.value,
    likes: 0
  }
  makeCard(toyObj)
  post(toyObj)
  e.target.reset()
}

// Then, make the POST request
function post(toyObj) {
  const configObj = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json'
    },
    body: JSON.stringify(toyObj)
  };
  fetch('http://localhost:3000/toys', configObj)
  .then(res => res.json())
  .then(toy => console.log(toy))
}

// The Patch request
function updateLikes(toyObj) {
  fetch(`http://localhost:3000/toys/${toyObj.id}`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json'
    },
    body: JSON.stringify(toyObj)
  })
  .then(resp => resp.json())
  .then(toy => console.log(toy))
}





    
