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

let daysLeft = 3
let money = 2000
let vegetables = {
  Cabbage: randomValue(2,5),
  Bananas: randomValue(5,10),
  Oranges: randomValue(10,10),
}

let jacket = {
  cabbage: 0,
  bananas: 0,
  oranges: 0,
}



function randomValue (min, multiplyer) {
  let value = min + Math.floor(Math.random()* multiplyer)
  return value
}

function updateSubtotal () {
  const products = document.getElementsByClassName('product')
  // let price = document.querySelector('.price span').textContent
  // let quantity = document.querySelector('.quantity input').value
  // let subtotal = price * quantity
  // document.querySelector('.subtotal span').textContent = subtotal
  for (product of products) {
    console.log(product)
    let price = product.querySelector('.price span').textContent
    let quantity = product.querySelector('.quantity input').value
    let subtotal = price * quantity
    product.querySelector('.subtotal span').textContent = subtotal
  }
}

// changing subtotal when the quantity is changed

  document.querySelector('.quantity input').onkeyup = function () {updateSubtotal()}




function calculateAll() {
  const products = document.getElementsByClassName('product')
  let keys = []
  let values = []
  let counter = 0

  for (let [key, value] of Object.entries(vegetables)) {
    keys.push(key)
    values.push(value)
  };

  for (product of products) {
    product.querySelector('.name span').textContent = keys[counter]
    product.querySelector('.price span').textContent = values[counter]
    counter ++
  }
}






calculateAll()
// updateSubtotal()
// randomValue(10,2)
