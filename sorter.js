function sort (restaurants) {
  restaurants.forEach(item => {
    item.minCost = findMostOptimal(extractDiscount(item))
  })
  restaurants.sort((o1, o2) => o1.minCost.cost - o2.minCost.cost)
  return restaurants.map(e => ({ name: e.name, minCost: e.minCost }))
}

function findMostOptimal (discounts) {
  let minCost = Number.MAX_VALUE
  let withDiscount = undefined
  discounts.filter(e => e.pre >= 30).forEach(({ pre, discount }) => {
    let redPacket = getRedPacketValue(pre)
    let cost = pre - discount - redPacket
    if (cost < minCost) {
      minCost = cost
      withDiscount = { pre, discount }
    }
  })
  return { cost: minCost, discount: withDiscount }
}

function getRedPacketValue (cost) {
  return cost >= 50 ? 15 : cost >= 32 ? 10 : cost >= 30 ? 8 : 0
}

function extractDiscount (restaurant) {
  let activityWrapper = restaurant.activities.filter(e => e.type === 102)[0] || {}
  if (!activityWrapper.attribute) return []
  return Object.entries(JSON.parse(activityWrapper.attribute))
    .map(([k, v]) => ({ pre: k, discount: v[1] }))
}

module.exports = sort
