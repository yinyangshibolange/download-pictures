const ora = require("ora");

let instance;
module.exports = (option) => {
    if (instance) {
        // 如果已存在 则返回instance
        return instance;
      }
      instance = ora(option); // 如果不存在 则new一个
      return instance;
};

// let basetext = 'Loading Time '

// ora_instance.start();
// let index = 0

// ora_instance.text = basetext + index + 's'
// const interval = setInterval(function() {
//     // ora_instance.color = 'yellow';
//     index += 1
//     if(index === 2) {
//         clearInterval(interval)
//         ora_instance.stop()
//     }
//     ora_instance.text = basetext + index + 's'
// }, 1000)

// spinner.stop()
