const sorter = require('./sorter')
const fetchRestaurants = require('./request')

async function main () {
  let restaurants = await fetchRestaurants(100)
  let result = sorter(restaurants).filter(e => e.minCost.cost < 20)
  result.forEach(e => console.log(`${e.name}: ${e.minCost.discount.pre} - ${e.minCost.discount.discount} = ${e.minCost.cost}`))
}

main().then().catch()
