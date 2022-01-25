/*

2.check the amount of money available before making purchase
3.check inventory before selling items
4.refactor buy and sell method together into one.
*/

let daysLeft = 2

let money = 200

// INVENTORY OF THE ITEMS THE PLAYER HAS
let jacket = {
  Cabbage: 0,
  Bananas: 0,
  Oranges: 0,
}

// CALCULATE RANDOM VALUE PASSED ALONG FOR PRICES OF ITEMS
function randomValue (min, multiplyer) {
  let value = min + Math.floor(Math.random()* multiplyer)
  return value
}

// ADD ITEMS TO THE INVENTORY AND REMOVE MONEY FROM THE WALLET, RERENDER THE INVENTORY
function purchase () {
  document.querySelectorAll('.product').forEach(function (row){
    let cost = row.querySelector('.subtotal span').textContent
    money -= cost
    displayStats('.money', money)
    let name = row.querySelector('.name span').textContent
    jacket[name] += Number(row.querySelector('.quantity input').value)
    row.querySelector('.quantity input').value = ''
    interpolateValues('items-cell', jacket, '.item', '.amount')
    updateSubtotal()
  })
}
// TRIGGERING THE PURCHASE FUNCTION
document.querySelectorAll('.btn-buy').forEach(function (button) {
  button.onclick = purchase
})

// REMOVE ITEMS TO THE INVENTORY AND ADD MONEY TO THE WALLET, RERENDER THE INVENTORY
function sell () {
  document.querySelectorAll('.product').forEach(function (row){
    let cost = Number(row.querySelector('.subtotal span').textContent)
    console.log(cost);
    money += cost
    displayStats('.money', money)
    let name = row.querySelector('.name span').textContent
    jacket[name] -= Number(row.querySelector('.quantity input').value)
    row.querySelector('.quantity input').value = ''
    interpolateValues('items-cell', jacket, '.item', '.amount')
    updateSubtotal()
  })
}
// TRIGGERING THE SELL FUNCTION
document.querySelectorAll('.btn-sell').forEach(function (button) {
  button.onclick = sell
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

// UPDATE SUBTOTAL WHEN QUANTITY IS CHANGED
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

// TRIGGERS NEWDAY FUNCTION
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
    Cabbage: randomValue(2,5),
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
      displayStats('.time', 'LAST DAY')
    }
  }
}

// START A NEW GAME
function startGame() {
  money = 200
  daysLeft = 2
  vegetables = {
    Cabbage: randomValue(2,5),
    Bananas: randomValue(5,10),
    Oranges: randomValue(10,10),
  }
  interpolateValues('items-cell', jacket, '.item', '.amount')
  interpolateValues('product', vegetables, '.name span', '.price span')
  displayStats('.time', daysLeft)
  displayStats('.money', money)
}



startGame()
