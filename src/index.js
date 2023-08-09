let addToy = false;
const container = document.getElementById('toy-collection')
const form = document.querySelector('.add-toy-form')

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

fetch('http://localhost:3000/toys')
.then(resp => resp.json())
.then(toysArr => renderToys(toysArr))

function renderToys(toysArr) {
  toysArr.forEach(toy => {

    const card = document.createElement('div')
    card.className = 'card'

    const name = document.createElement('h2')
    name.textContent = toy.name

    const image = document.createElement('img')
    image.src = toy.image
    image.className = 'toy-avatar'

    const likes = document.createElement('p')
    likes.textContent = `${toy.likes} likes`

    const button = document.createElement('button')
    button.textContent = 'Like ❤️'
    button.className = 'like-btn'
    button.setAttribute('id', `${toy.id}`)

    button.addEventListener('click', () => {
      likes.textContent = `${toy.likes += 1} likes`
      patchLikes(toy.id, toy.likes)
    })

    card.append(name, image, likes, button)
    container.append(card)
  })
}

function patchLikes(id, newLikes) {
  fetch(`http://localhost:3000/toys/${id}`, {
  method: 'PATCH',
  headers:
    {
      "Content-Type": "application/json",
      Accept: "application/json"
    },
  body: JSON.stringify({likes: newLikes})
  })
  .then(resp => resp.json())
}

form.addEventListener('submit', e => {
  e.preventDefault()
  const inputName = e.target.name.value 
  const inputImage = e.target.image.value
  const newObj = {
    name: inputName,
    image: inputImage,
    likes: 0
  }
  postToy(newObj)
  e.target.reset()
})

function postToy(newObj) {
  fetch('http://localhost:3000/toys', {
  method: 'POST',
  headers:
    {
      "Content-Type": "application/json",
      Accept: "application/json"
    },
  body: JSON.stringify(newObj)
  })
  .then(resp => resp.json())
  .then(newObj => {
    newArr =[]
    newArr.push(newObj)
    renderToys(newArr)
  })
}

/* Other solution:

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
.then(data => data.forEach(toy => renderToys(toy)))

// With the response data, render the toys in the DOM, by making a card <div class="card"> for each toy and adding it to the toy-collection div. Then, add toy info into the cards.

function renderToys(toy) {
    let toyContainer = document.querySelector('#toy-collection');
    let card = document.createElement('div');
    card.className = 'card';

    card.innerHTML = `
    <h2>${toy.name}</h2>
    <img src="${toy.image}" class="toy-avatar">
    <p>${toy.likes} likes</p>
    <button class="like-btn" id=${toy.id}>Like ❤️</button>`
    
    const likeBtn = card.querySelector('.like-btn')
    likeBtn.addEventListener('click', () => {
      let p = card.querySelector('p')
      p.textContent = `${toy.likes+= 1} likes`
      updateLikes(toy.id, toy.likes)
    })
    toyContainer.appendChild(card)
  }

// Add a new toy. When a user submits the toy form, send a POST request to add the new toy to Andy's Toy Collection. If the post is successful, the toy should be added to the DOM without reloading the page.

const form = document.querySelector('.add-toy-form')

form.addEventListener('submit', e => {
  e.preventDefault()
  //console.log(e.target.name)
  let newToyObj = {
    name: e.target.name.value,
    image: e.target.image.value,
    likes: 0
  }
  renderNewToy(newToyObj)
  e.target.reset()
})

// Then, make the POST request to send to the server the new card.
function renderNewToy(newToyObj) {
  const configObj = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json'
    },
    body: JSON.stringify(newToyObj)
  }
  fetch('http://localhost:3000/toys', configObj)
  .then(res => res.json())
  .then(newToy => renderToys(newToy))
}

// Then, make the PATCH request to update the number of likes in the server.
function updateLikes(id, newNumberOfLikes) {
  fetch(`http://localhost:3000/toys/${id}`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json'
    },
    body: JSON.stringify({likes: newNumberOfLikes})
  })
  .then(resp => resp.json())
  .then(updatedToy => console.log(updatedToy))
}
*/






