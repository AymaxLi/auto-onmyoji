const robot = require('robotjs')
const btnColor = require('./constant').BTN_TIAOZHAN.slice(1).toLowerCase()
const screen = robot.getScreenSize()

function scan() {
  let flag = 0
  for (let x = screen.width - 1; x >= 0 ; x -= 10) {
    for (let y = 0; y < screen.height; y += 10) {
      const pix = robot.getPixelColor(x, y)
      robot.moveMouseSmooth(x, y)
      if( pix === btnColor) flag = 1
    }
  }
}

// 鼠标手动定位
const locateByUser = timeout => new Promise((resolve, reject) => {
  let timer = setInterval(() => {
    let pos = robot.getMousePos()
    if (confirmButton(pos)) {
      // 定位成功
      clearInterval(timer)
      console.log('located!')
      resolve(pos)

      return
    } 
    if (timer > timeout) {
      // 超时
      console.log('timeout!')
      reject()

      return
    }
    console.log('please move to the correct position.')
  }, 2000)
})

function confirmButton(pos) {
  return robot.getPixelColor(pos.x, pos.y) === btnColor
}

module.exports = {
  locateByUser: locateByUser,
  confirmButton: confirmButton
}