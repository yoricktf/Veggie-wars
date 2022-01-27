let daysLeft = 0
let money = 0

// INVENTORY OF THE ITEMS THE PLAYER HAS
let jacket = {
  Cabbages: 0,
  Bananas: 0,
  Oranges: 0,
  Broccoli: 0,
}

// CALCULATE RANDOM VALUE PASSED ALONG FOR PRICES OF ITEMS
function randomValue (min, multiplyer) {
  let value = min + Math.floor(Math.random()* multiplyer)
  return value
}

// ADD/REMOVE ITEMS TO THE INVENTORY AND ADD/REMOVE MONEY FROM THE WALLET,
// RERENDER THE INVENTORY
function purchaseAndSell(event) {
  console.log(event.target.parentNode.parentNode)
  const row = event.target.parentNode.parentNode
  let cost = Number(row.querySelector('.subtotal span').textContent)
  let name = row.querySelector('.name span').textContent
  let amount = row.querySelector('.quantity input').value
  if (event.target.innerText === 'BUY') {
    if (money >= cost && amount > 0) {
      money -= cost
      jacket[name] += Number(row.querySelector('.quantity input').value)
      let timerInterval
      console.log('bought')
      Swal.fire({
        title: 'YOU GOT IT',
        html: `you spent $${cost} and bought ${amount} ${name}`,
        timer: 1500,
        timerProgressBar: true,
        icon: 'success',
        willClose: () => {
          clearInterval(timerInterval)
        }
      })
    } else if (money < cost) {
      console.log('notbought')
      swal.fire("No cash", `You don't have enough money! You only have $${money}`, 'error')
    }
  } else if (event.target.innerText === 'SELL') {
    console.log('sellbutton');
    if (jacket[name] >= amount) {
      console.log('sold');
      money += cost
      jacket[name] -= Number(row.querySelector('.quantity input').value)
      let timerInterval
      Swal.fire({
        title: 'SOLD',
        html: `You sold ${amount} ${name} for $${cost}`,
        timer: 1500,
        timerProgressBar: true,
        icon: 'success',
        willClose: () => {
          clearInterval(timerInterval)
        }
      })
    } else {
      swal.fire("You ain't got it!", `You don't have enough ${name} to sell`, 'error')
    }
  }
  displayStats('.money', money)
  row.querySelector('.quantity input').value = ''
  interpolateValues('items-cell', jacket, '.item', '.amount')
  updateSubtotal()
}

// TRIGGERS purchaseAndSell() FUNCTION
document.querySelectorAll('.button').forEach(function (button) {
  button.onclick = purchaseAndSell
})

// CALCULATES SUBTOTAL BASED ON QUANTITY AND PRICE, TRIGGERED
// WHEN QUANTITY IS ENTERED
function updateSubtotal () {
  const products = document.getElementsByClassName('product')
  for (product of products) {
    let price = product.querySelector('.price span').textContent
    let quantity = product.querySelector('.quantity input').value
    let subtotal = price * quantity
    product.querySelector('.subtotal span').textContent = subtotal
  }
}

// TRIGGERS updateSubtotal() FUNCTION
document.querySelectorAll('.quantity input').forEach(function (input) {
    input.onkeyup = updateSubtotal
})

// DISPLAYS THE DAY COUNTER AND WALLET
function displayStats(selector, value) {
  let changingVariable = document.querySelector(selector)
  changingVariable.textContent = value
  // changingVariable.classList.add('increase')
  // setTimeout(() => {
  //   changingVariable.classList.remove('increase')
  // }, 500);
}

// DISPLAYS THE PRODUCT AND YOUR INVENTORY, BOTH NAMES AND NO. OF ITEMS
function interpolateValues(className, object, selector1, selector2) {
  const inventory = document.getElementsByClassName(className)
  let keys = []
  let values = []
  let counter = 0
  // PASS THE VALUE AND KEYS TO THEIR RESPECTIVE ARRAYS
  for (let [key, value] of Object.entries(object)) {
    keys.push(key)
    values.push(value)
  };
  // SET THE KEY AND VALUE TO THE HTML
  for (item of inventory) {
    item.querySelector(selector1).textContent = keys[counter]
    item.querySelector(selector2).textContent = values[counter]
    counter ++
  }
}

// TRIGGERS newDay() FUNCTION
document.getElementById('switchLocation').onclick = function () {chooseLocation()}

// CHANGES LOCATION TEXT, REINITIALIZES THE VALUES OF THE VEGETABLES,
//  COUNTS DOWN DAYS REMAINING, RERENDERS INVENTORY
function newDay() {
  let vegetables = vegtablesAvailable()
  interpolateValues('items-cell', jacket, '.item', '.amount')
  interpolateValues('product', vegetables, '.name span', '.price span')
  displayStats('.money', money)
  gameEnd()
}

// DISPLAY DIFFERENT VEGETABLES IN DIFFERENT LOCATIONS
function vegtablesAvailable() {
  let location = document.getElementById('location').innerText
  let vegetables = {}
  if (location === 'Brooklyn') {
    return vegetables = {
    Cabbages: randomValue(2,5),
    Bananas: randomValue(6,9),
    Oranges: randomValue(10,10),
    }
  } else if (location === 'Manhattan') {
    return vegetables = {
    Bananas: randomValue(6,9),
    Oranges: randomValue(10,10),
    Broccoli: randomValue(4,20),
    }
  } else if (location === 'Queens') {
    return vegetables = {
    Cabbages: randomValue(2,5),
    Oranges: randomValue(10,10),
    Broccoli: randomValue(4,20),
    }
  }
}

// SELECT LOCATION TO TRAVEL TO
async function chooseLocation() {
  let endCondition = document.getElementById('switchLocation').innerText
  let currentLocation = document.getElementById('location').innerText
  if (endCondition !== 'END GAME') {

const { value: location } = await Swal.fire({
  title: 'WHERE TO?',
  text: `You're in ${currentLocation}`,
  input: 'select',
  inputOptions: {
    'Brooklyn': 'Brooklyn',
    'Manhattan': 'Manhattan',
    'Queens': 'Queens'
  },
  inputPlaceholder: 'WHERE YOU WANNA GO?',
  confirmButtonText: 'LETS GOOOOOO!',
  // showCancelButton: true,
  icon: 'question',
})

let timerInterval
Swal.fire({
  title: 'TRAVELING',
  html: `You're headed towards ${location}`,
  timer: 1000,
  timerProgressBar: true,
  icon: 'info',
  willClose: () => {
    clearInterval(timerInterval)
  }
})

    if (location === "Brooklyn") {
      document.getElementById('location').innerText ='Brooklyn'
      newDay()
    } else if (location === "Manhattan" ) {
      document.getElementById('location').innerText ='Manhattan'
      newDay()
    } else if (location === "Queens") {
      document.getElementById('location').innerText ='Queens'
      newDay()
    } else {
      chooseLocation()
    }
  } else {
    newDay()
  }
}

// CHECKS REMAINING DAYS, DECREMENTS COUNTER OR STARTS NEW GAME
function gameEnd() {
  if (daysLeft === 0 ) {
    swal.fire({
      title: "GAME OVER!!!",
      text: `Your score is ${money}`,
      icon: 'success',
      confirmButtonText: 'PLAY AGAIN!'
    })
    startGame()
  } else {
    daysLeft -= 1
    displayStats('.time', daysLeft)
    if (daysLeft === 0) {
      displayStats('.time', 'LAST DAY!!!')
      toggleButton('END GAME')
    }
  }
}

// SHOW END OF GAME BUTTON, ADD AND REMOVE CLASS FOR COLOR
function toggleButton(text) {
  let button = document.getElementById('switchLocation')
  button.innerText = text
  if (button.innerText === 'END GAME') {
    button.classList.add('warning')
  } else {
    button.classList.remove('warning')
  }
}

// START A NEW GAME
function startGame() {
  money = 100
  daysLeft = 10
  let vegetables = vegtablesAvailable()

  jacket = {
  Cabbages: 0,
  Bananas: 0,
  Oranges: 0,
  Broccoli: 0,
}

  toggleButton('SWITCH LOCATION')
  interpolateValues('items-cell', jacket, '.item', '.amount')
  interpolateValues('product', vegetables, '.name span', '.price span')
  displayStats('.time', daysLeft)
  displayStats('.money', money)
}

startGame()
// INSTRUCTIONS ON BOOT
window.onload = function () {
  swal.fire({
    title: "VEGGIE WARS",
    imageUrl: 'dopewars.png',
    imageWidth: 400,
    imageHeight: 240,
    imageAlt: 'Custom image',
    text: `Based on John E. Dell's old Drug Wars game, Veggie Wars is a simulation of a farmers market. Veggie Wars is an All-International game which features buying and selling!\nYour goal is to make as much money as possible! You have 10 days of game time to make your fortune.`,
    confirmButtonText: 'LETS SELL SOME VEGGIES!'
  });
}
