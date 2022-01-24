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
let jacket = {
  cabbage: 0,
  bananas: 0,
  oranges: 0
}

function randomValue (min, multiplyer ) {
  let value = min + Math.floor(Math.random()* multiplyer)
  console.log(value)
}

function updateSubtotal () {
  let price = document.querySelector('.price span').innerHTML
  console.log(price);
  return price
}
updateSubtotal()
randomValue(10,2)
