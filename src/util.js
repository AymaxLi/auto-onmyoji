module.exports = {
  random: (min, max) => min + Math.random() * (max - min),

  sleep: time => new Promise(res => {
    setTimeout(_ => {
      res()
    }, time)
  })
}