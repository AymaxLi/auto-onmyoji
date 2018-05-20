const locate = require('./locate')
const work = require('./work')
const { TIME_QILIN, TIME_YUHUN } = require('./constant')

;(async _ => {
  let initialPos = await locate.locateByUser(30 * 1000)
    .then(pos => pos)
    .catch(console.error)
  
  work
    .init(initialPos)
    .roll(TIME_YUHUN * 1000)
})()