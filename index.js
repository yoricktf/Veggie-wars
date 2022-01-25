/*
-NICE TO HAVE----
- Select location from multiple options
- add a flashing color on the money/inventory if sold/bought
- mobile optimised
- dynamically create the HTML
- instructions about the game


*/
let daysLeft = 0
let money = 0

// INVENTORY OF THE ITEMS THE PLAYER HAS
let jacket = {
  Cabbages: 0,
  Bananas: 0,
  Oranges: 0,
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
document.getElementById('switchLocation').onclick = function() {newDay()}

// CHANGES LOCATION TEXT, REINITIALIZES THE VALUES OF THE VEGETABLES,
//  COUNTS DOWN DAYS REMAINING, RERENDERS INVENTORY
function newDay() {
  let title = document.getElementById('location').innerText
  if (title === 'Baltimore') {
    document.getElementById('location').innerText = 'New York'
  } else {
    document.getElementById('location').innerText = 'Baltimore'
  }
  let vegetables = {
    Cabbages: randomValue(2,5),
    Bananas: randomValue(5,10),
    Oranges: randomValue(10,10),
  }
  interpolateValues('items-cell', jacket, '.item', '.amount')
  interpolateValues('product', vegetables, '.name span', '.price span')
  displayStats('.money', money)
  gameEnd()
}

// CHECKS REMAINING DAYS, DECREMENTS COUNTER OR STARTS NEW GAME
function gameEnd() {
  if (daysLeft === 0 ) {
    alert(`GAME OVER!!!\nYour score is ${money}`)
    startGame()
  } else {
    daysLeft -= 1
    console.log(daysLeft)
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
  daysLeft = 2
  vegetables = {
    Cabbages: randomValue(2,5),
    Bananas: randomValue(5,10),
    Oranges: randomValue(10,10),
  }
  jacket = {
  Cabbages: 5,
  Bananas: 0,
  Oranges: 0,
}
  interpolateValues('items-cell', jacket, '.item', '.amount')
  interpolateValues('product', vegetables, '.name span', '.price span')
  displayStats('.time', daysLeft)
  displayStats('.money', money)
}

startGame()
