const Discount = require('./discount')

function sortAndMap (restaurants) {
  restaurants.forEach(item => {
    item.minCost = findMostOptimal(item)
  })
  restaurants.sort((o1, o2) => o1.minCost.cost - o2.minCost.cost)
  return restaurants.map(e => ({ name: e.name, minCost: e.minCost }))
}

let redPackets = [
  new Discount(30, 8),
  new Discount(32, 10),
  new Discount(50, 15)
]

function findMostOptimal (item) {
  let minCost = Number.MAX_VALUE
  let withDiscount = undefined
  let withRedPacket = undefined
  extractDiscount(item).forEach((discount) => {
    redPackets.forEach(redPacket => {
      let cost = calculateMinCost(discount, redPacket)
      if (cost < minCost) {
        minCost = cost
        withDiscount = discount
        withRedPacket = redPacket
      }
    })
  })
  return { cost: minCost, discount: withDiscount, redPacket: withRedPacket }
}

function calculateMinCost (discount, redPacket) {
  let pre = Math.max(discount.pre, redPacket.pre)
  return pre - discount.discount - redPacket.discount
}

function extractDiscount (restaurant) {
  let activityWrapper = restaurant.activities.filter(e => e.type === 102)[0] || {}
  if (!activityWrapper.attribute) return []
  return Object.entries(JSON.parse(activityWrapper.attribute))
    .map(([k, v]) => new Discount(k, v[1]))
}

module.exports = sortAndMap
