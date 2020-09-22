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
 *  path: '',
 *  subtitle: '',
 *  select: '',
 *  attr:''
 * }]
 */
const urls = require("./urls")() // 获取url的方法,请自定义吧

console.log(urls)

const download_dir = path.join(argo['-path'] || __dirname, 'download')
const makeDir = require("./util/makeDir")

makeDir(download_dir)
    .then(res => {
        // console.log(res)
        // 遍历urls进行下载
        urls.forEach((ele, index) => {
            require("./dlpics")(ele.path, path.join(download_dir, ele.name || ('folder' + index)), ele.subtitle, ele.select, ele.attr)
           
        })
    })
    .catch(err => {
        console.log(err)
    })


