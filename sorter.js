const Discount = require('./discount')
const { redPackets } = require('./config')

function sortAndMap (restaurants) {
  return restaurants.map(e => ({ name: e.name, minCost: findMostOptimal(e) }))
    .sort((o1, o2) => o1.minCost.cost - o2.minCost.cost)
}

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
