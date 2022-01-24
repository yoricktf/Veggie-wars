/*
1.a counter decrementing the number of days remaining, this gets
decremented when switching between locations and ends the game when it reaches 0

2.a money counter starting at 2000 that cannot go below zero that gets changed
when buying or selling items

3.an object to store item names and quantity that have been purchased

4. a random number generated for the cost of the drugs that gets changed every
time a location is switched.

5. a button to switch locations that changes the name of the place and
recalculates the prices
*/

let daysLeft = 4
let money = 200

// PRICES AND NAMES OF ITEMS IN THE MARKET
let vegetables = {
  Cabbage: randomValue(2,5),
  Bananas: randomValue(5,10),
  Oranges: randomValue(10,10),
}

// INVENTORY OF THE ITEMS THE PLAYER HAS
let jacket = {
  Cabbage: 4,
  Bananas: 6,
  Oranges: 9,
}

// CALCULATE RANDOM VALUE PASSED ALONG FOR PRICES OF ITEMS
function randomValue (min, multiplyer) {
  let value = min + Math.floor(Math.random()* multiplyer)
  return value
}

// CALCULATES SUBTOTAL BASED ON QUANTITY AND PRICE, TRIGGERED WHEN QUANTITY IS ENTERED
function updateSubtotal () {
  const products = document.getElementsByClassName('product')
  for (product of products) {
    console.log(product)
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


// FUNCTION IS BEING TRIGGERED BUT NOT CHANGING THE PRICES WHEN CALLED AGAIN
document.getElementById('switchLocation').onclick = function() {newDay()}
function newDay() {
  let title = document.getElementById('location').innerText
  if (title === 'Baltimore') {
    document.getElementById('location').innerText = 'New York'
  } else {
    document.getElementById('location').innerText = 'Baltimore'
  }

  if (daysLeft > 0) {
    daysLeft -= 1
    console.log(daysLeft)
  }
  // console.log(title)

  // console.log('object');
  interpolateValues('items-cell', jacket, '.item', '.amount')
  interpolateValues('product', vegetables, '.name span', '.price span')
  displayStats('.time', daysLeft)
  displayStats('.money', money)
}

newDay()
