const sorter = require('./sorter')
const fetchRestaurants = require('./request')
const config = require('./config')

async function main () {
  let restaurants = await fetchRestaurants()
  let result = sorter(restaurants).filter(e => e.minCost.cost <= config.maxCost)
  result.forEach(e => console.log(`${e.name}: discount(${e.minCost.discount}) + red-packet(${e.minCost.redPacket}) = ${e.minCost.cost}`))
}

main().then().catch()
