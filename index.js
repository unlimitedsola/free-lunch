const sorter = require('./sorter')
const fetchRestaurants = require('./request')

async function main () {
  let restaurants = await fetchRestaurants(100)
  let result = sorter(restaurants).filter(e => e.minCost.cost < 25)
  result.forEach(e => console.log(`${e.name}: discount(${e.minCost.discount}) + red-packet(${e.minCost.redPacket}) = ${e.minCost.cost}`))
}

main().then().catch()
