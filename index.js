// var exec = require('child_process').exec;
// exec('explorer /select, "c:\windows"')

const path = require("path")
const argv = process.argv.splice(2) // 获取命令行参数,保存的地址

const argo = {}
argv.forEach(arg => {
    const temp_arr = arg.split('=')
    if(temp_arr[1] !== undefined) {
        argo[temp_arr[0]] = temp_arr[1]
    } else {
        argo[temp_arr[0]] = true
    }
})
console.log(argo)
/**
 * 返回格式
 * [{
 *  name: '',
 *  path: ''
 * }]
 */
const urls = require("./urls")() // 获取url的方法,请自定义吧

console.log(urls)

require("./util/makeDir")(path.join(argo['-path'] || __dirname, 'download'))
    .then(res => {
        console.log(res)
    })
    .catch(err => {
        console.log(err)
    })


