const Discount = require('./discount')

module.exports = {
  // if you don't know what this means, just replace latitude and longitude and you're good to go.
  url: 'https://h5.ele.me/restapi/shopping/v3/restaurants?latitude=22.523640&longitude=113.391071&extras[]=activities&extras[]=tags&extra_filters=home&quality_union=1&activity_types[]=3&rank_id=&terminal=h5',
  // your session id, can be obtained from your cookies at https://h5.ele.me/.
  sid: '',
  // limits the number of restaurants will be queried
  queryLimit: 200,
  // filter out all restaurants that are impossible for having a minimum cost that lower than this value.
  maxCost: 25,
  // your available red packets.
  redPackets: [
    new Discount(30, 8),
    new Discount(32, 10),
    new Discount(50, 15)
  ]
}
