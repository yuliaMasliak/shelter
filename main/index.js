import {pets} from '../assets/pets.js'

let burger = document.querySelector('.burger')
let burgerMenu = document.querySelector('.burger-menu')
let burgerUl = document.querySelector('.burger-ul')
let navLinks = burgerUl.querySelectorAll('li')
let overlay = document.querySelector('.overlay')
let petsTotal = 3
let friendsBlock = document.querySelector('.friends-cards')
let prevArr = []

burger.addEventListener('click', () => {
    burger.classList.toggle('change')
    overlay.classList.toggle('hidden')
    burgerMenu.classList.toggle('active')
    document.body.classList.toggle('fixed');
})
function hideBurger () {
    burger.classList.remove('change')
        burgerMenu.classList.remove('active')
        document.body.classList.remove('fixed')
        overlay.classList.add('hidden')
}
navLinks.forEach(link => {
    link.addEventListener('click', hideBurger)
})
overlay.addEventListener('click', hideBurger)

//Courusel

window.addEventListener('load', () => {
  addPet()
})

function addPet () {
    let currArr = []
   while(currArr.length < petsTotal){
        let randomItem =  Math.floor(Math.random() * 8)
       if (currArr.indexOf(randomItem) <0 && prevArr.indexOf(randomItem)<0) {
        currArr.push(randomItem)
       }
    }
    prevArr = currArr
        let petsBlock = document.createElement('div')
  petsBlock.classList.add('friends-block')
  for (let i = 0; i < 3; i++){
    let friend = document.createElement('div')
    friend.classList.add('friend')
    friend.classList.add('fade')
    friend.id = `${pets[currArr[i]].id}`
    friend.innerHTML = `<img
    src="${pets[currArr[i]].img}">
  <div class="freind-second-block">
    <div class="friend-name">${pets[currArr[i]].name}</div>
    <button
      type="button"
      class="friend-learn"
      >Learn more</button
    ></div
  >`
  friend.addEventListener('click', () => {
      openPopUp(friend.id)
    })
  petsBlock.append(friend)
  }

    friendsBlock.append(petsBlock)
    }

let arrowLeft = document.querySelector('.arrow-left')
arrowLeft.addEventListener('click', () => {
       friendsBlock.innerHTML = ''
    addPet()
})
let arrowRight = document.querySelector('.arrow-rigth')
arrowRight.addEventListener('click', () => {
       friendsBlock.innerHTML = ''
    addPet()
})


// Popup
function openPopUp (id) {
  let friend = document.createElement('div')
  friend.classList.add('friend-popup')
  let friendObj = {}
  for (let pet of pets) {
    if (pet.id == id) {
      friendObj = pet
    }
  }

  friend.innerHTML = `<div class='cross-popup'>&#9587</div>
  <div class="popup-content">
    <div class="popup-img"><img src='./assets/${friendObj.name.toLowerCase()}.png' alt="pet"></div>
    <div class="popup-text">
          <div class="popup-text__name">${friendObj.name}</div>
          <div class="popup-text__breed">${friendObj.type} - ${friendObj.breed}</div>
          <div class="popup-text__desc">${friendObj.description}</div>
          <ul class="popup-text__ul">
          <li><strong>Age</strong>: ${friendObj.age},</li>
          <li><strong>Inoculations</strong>: ${friendObj.inoculations},</li>
          <li><strong>Diseases</strong>: ${friendObj.diseases},</li>
          <li><strong>Parasites</strong>: ${friendObj.parasites}</li>
          </ul>
    </div>
  </div>`

  document.body.append(friend)
  let cross = document.querySelector('.cross-popup')
  let overlay = document.querySelector('.overlay-popup')
  overlay.classList.remove('hidden')
  document.body.style.overflow = 'hidden';
  overlay.addEventListener('click', () => {
    overlay.classList.add('hidden')
    friend.remove()
    document.body.style.overflow = 'auto';
  })
  cross.addEventListener('click', () => {
    overlay.classList.add('hidden')
    friend.remove()
    document.body.style.overflow = 'auto';
  })
}
