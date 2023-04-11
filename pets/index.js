import {pets} from '../assets/pets.js'

let burger = document.querySelector('.burger')
let burgerMenu = document.querySelector('.burger-menu')
let burgerUl = document.querySelector('.burger-ul')
let navLinks = burgerUl.querySelectorAll('li')
let overlay = document.querySelector('.overlay')
let friendsBlock = document.querySelector('.friends-cards')
let curPage = document.querySelector('.current-page')
let totalPetsPerPage = 8
let totalPages = 6
let pages = []
let currentPage = 1

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

// window load
window.addEventListener('load', () => {

        if (screen.width > 768 && screen.width < 1280) {
            totalPetsPerPage = 6
            totalPages = 8
            pagination ()
        }
        else if (screen.width < 768) {
            totalPetsPerPage = 3
            totalPages = 16
            pagination ()
        } else {
            totalPetsPerPage = 8
            totalPages = 6
            pagination ()
        }

    createPetsArray()
})



let targetArray = [];
function createPetsArray () {
    const REPEAT_AMOUNT = 6;
    const LENGTH_RESULT = 48;

    function hasDuplicatesEvery6 (array) {
        for (let i = 0; i < array.length; i += REPEAT_AMOUNT) {
            const group = array.slice(i, i + REPEAT_AMOUNT);
            const set = new Set(group);
            if (set.size !== group.length) {
                return true;
            }
        }
        return false;
    }

    while (targetArray.length < LENGTH_RESULT) {
        const testARR = [...targetArray];
        const randomArr = [1, 2, 3, 4, 5, 6, 7, 8].sort(() => Math.random() - 0.5);
        testARR.push(...randomArr);
        if (hasDuplicatesEvery6(testARR)) {
            continue;
        }
        targetArray = testARR;
    }

}



// Pagination
let nextArrow = document.querySelector('.next-arrow')
let prevArrow = document.querySelector('.prev-arrow')
let startArrow = document.querySelector('.start-arrow')
let lastArrow = document.querySelector('.last-arrow')

const myPromise = new Promise((resolve, reject) => {
    resolve(createPetsArray ());
})
myPromise.then(createPagePets());


function createPagePets () {
    let petsBlock = document.createElement('div')
    petsBlock.classList.add('friends-block')
    let array = [...targetArray]

    window.addEventListener('resize', () => {
        if (screen.width > 768 && screen.width < 1280) {
            totalPetsPerPage = 6
            totalPages = 8
            pagination ()
        }
        else if (screen.width < 768) {
            totalPetsPerPage = 3
            totalPages = 16
            pagination ()
        } else {
            totalPetsPerPage = 8
            totalPages = 6
            pagination ()
        }
    })
    let indexToSliceArray = 0
    let arrayPerPage = array.slice(indexToSliceArray + totalPetsPerPage * currentPage - totalPetsPerPage, indexToSliceArray + totalPetsPerPage * currentPage)

    for (let i = 0; i < arrayPerPage.length; i++){
        let petCard = document.createElement('div')
        petCard.id = pets[arrayPerPage[i]-1].id
        petCard.classList.add('friend')
        petCard.classList.add('fade')
        petCard.innerHTML
        = `<img
          src=".${pets[arrayPerPage[i]-1].img}">
        <div class="freind-second-block">
          <div class="friend-name">${pets[arrayPerPage[i]-1].name}</div>
          <button
            type="button"
            class="friend-learn"
            >Learn more</button
          ></div>`
        petsBlock.append(petCard)
        petCard.addEventListener('click', () => {
            openPopUp(petCard.id)
          })
            pagination()
            curPage.innerHTML = currentPage
    }


friendsBlock.innerHTML = ''
    friendsBlock.append(petsBlock)
    curPage.innerHTML = currentPage
}
function pagination () {
    if (currentPage === totalPages || currentPage > totalPages) {
        nextArrow.disabled = true
        lastArrow.disabled = true
    } else if (currentPage < totalPages) {
        nextArrow.disabled = false
        lastArrow.disabled = false
    }
    if (currentPage === 1) {
        prevArrow.disabled = true
        startArrow.disabled = true
    } else {
        prevArrow.disabled = false
        startArrow.disabled = false
    }
}
nextArrow.addEventListener('click', () => {
    currentPage += 1
    createPagePets()
    pagination ()
    })

prevArrow.addEventListener('click', () => {
        currentPage -= 1
        createPagePets()
    pagination ()
    })
lastArrow.addEventListener('click', () => {
        currentPage = totalPages
        createPagePets()
    pagination ()
})
startArrow.addEventListener('click', () => {
    currentPage = 1
    createPagePets()
pagination ()
})

//Popup

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
      <div class="popup-img"><img src='../assets/${friendObj.name.toLowerCase()}.png' alt="pet"></div>
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
