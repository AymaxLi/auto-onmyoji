const robot = require('robotjs')
const { random, sleep } = require('./util')
const { confirmButton } = require('./locate')

let initialPos
let flag = true

function init(pos) {
  initialPos = pos

  return this
}

async function roll(time) {
  let count = 0

  while(flag) {
    // 移动到开始按钮位置
    start()

    // 确认开始按钮
    await new Promise((resolve, reject) => {
      let timer = setInterval(_ => {
        if (!confirmButton(initialPos)) return
        resolve()
        clearInterval(timer)
      }, 100)
    })

    await sleep(random(0, 1000))

    // 点击开始
    click()

    // 设置战斗时长
    await sleep(time + random(0, 3000))

    // 移动到结束位置    
    end()
    await sleep(random(0, 2000))

    // 点击结算
    click()
    await sleep(random(0, 1000))

    // 计数
    count ++
    console.log(count)
  }
}

function start() {
  let {x, y} = initialPos

  // 点击随机位置
  robot.moveMouseSmooth(x + random(0, 80), y - random(0, 30))
}

function end() {
  let {x, y} = initialPos

  robot.moveMouseSmooth(x + random(200, 300), y - random(60, 300))
}

function click() {
  robot.mouseClick()  
}

module.exports = {
  init,
  roll
}