const fetch = require('node-fetch')
const config = require('./config')

async function fetchRestaurants (totalCount) {
  let result = []
  let offset = 0
  let limit = 30
  while (offset < totalCount) {
    let url = config.url + `&offset=${offset}&limit=${limit}`
    let data = await fetch(url, {
      'credentials': 'include',
      'headers': {
        'accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3',
        'accept-language': 'en-US,en;q=0.9,zh-CN;q=0.8,zh;q=0.7',
        'cache-control': 'no-cache',
        'pragma': 'no-cache',
        'upgrade-insecure-requests': '1',
        'cookie': `SID=${config.sid}`
      },
      'referrerPolicy': 'no-referrer-when-downgrade',
      'body': null,
      'method': 'GET',
      'mode': 'cors'
    }).then(res => res.json())
    result.push(...data.items.map(e => e.restaurant))
    if (!data.has_next) break
    offset += limit
  }
  return result
}

module.exports = fetchRestaurants
