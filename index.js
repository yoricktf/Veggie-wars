

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
function purchaseAndSell (event) {
  document.querySelectorAll('.product').forEach(function (row){
    let cost = Number(row.querySelector('.subtotal span').textContent)
    let name = row.querySelector('.name span').textContent
    let amount = row.querySelector('.quantity input').value
    if (event.target.innerText === 'BUY') {
      if (money >= cost) {
        money -= cost
        jacket[name] += Number(row.querySelector('.quantity input').value)
      } else {
        alert(`you don't have enough money! You only have $${money}`)
      }
    } else {
      if (jacket[name] >= amount) {
        money += cost
        jacket[name] -= Number(row.querySelector('.quantity input').value)
      }
      else {
        alert(`you don't have enough ${name} to sell`)
      }
    }
    displayStats('.money', money)
    row.querySelector('.quantity input').value = ''
    interpolateValues('items-cell', jacket, '.item', '.amount')
    updateSubtotal()
  })
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
  document.querySelector(selector).textContent = value
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
  if (endCondition !== 'END GAME') {

    // let location = prompt('where would you like to go?\nA)Brooklyn     B)Manhattan     C)Queens').toUpperCase()



const { value: text } = await Swal.fire({
  input: 'textarea',
  inputLabel: 'Message',
  inputPlaceholder: 'Type your message here...',
  inputAttributes: {
    'aria-label': 'Type your message here'
  },
  showCancelButton: true
})
console.log(text.toUpperCase())
console.log(typeof(text));
//   const test = text
// console.log(test.toUppercase())

// console.log(value);
// console.log(text.toUppercase());
let location = text.toUpperCase()



    if (location === "A" || location === "BROOKLYN" || location === '1') {
      document.getElementById('location').innerText ='Brooklyn'
      newDay()
    } else if (location === "B" || location === "MANHATTAN" || location === '2') {
      document.getElementById('location').innerText ='Manhattan'
      newDay()
    } else if (location === "C" || location === "QUEENS" || location === '3') {
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
      text: `Your score is ${money}`
    })
    startGame()
  } else {
    daysLeft -= 1
    displayStats('.time', daysLeft)
    if (daysLeft === 0) {
      displayStats('.time', 'LAST DAY!!!')
      document.getElementById('switchLocation').innerText = 'END GAME'
    }
  }
}

// START A NEW GAME
function startGame() {
  money = 100
  daysLeft = 4
  let vegetables = vegtablesAvailable()

  jacket = {
  Cabbages: 0,
  Bananas: 0,
  Oranges: 0,
  Broccoli: 0,
}
  document.getElementById('switchLocation').innerText = 'SWITCH LOCATION'
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
    text: `Based on John E. Dell's old Drug Wars game, Veggie Wars is a simulation of a farmers market. Veggie Wars is an All-International game which features buying and selling!\nYour goal is to make as much money as possible! You have 10 days of game time to make your fortune.`,
    button: {
      text: "LETS SELL SOME VEGGIES!",
    },
  });
}
