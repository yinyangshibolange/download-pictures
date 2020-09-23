// var exec = require('child_process').exec;
// exec('explorer /select, "c:\windows"')

const path = require("path")
const { url } = require("inspector")
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

const ora = require("./util/ora")({
    text: 'load'
})
ora.start()
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
const download_dir = path.join(argo['-path'] || __dirname, 'download')
// ora.text = 'loading......dowload folder is: ' + download_dir
 require("./urls")()
    .then(urls => {
        // console.log(urls)
        // require("fs").writeFile('./urls.json', JSON.stringify(urls), function() {
        //     console.log('write successed')
        // })
        // return
        console.log('共' + urls.length + '个图片页面')
        require("./util/makeDir")(download_dir)
            .then(res => {
                console.log('创建' + download_dir + '文件夹')
                // ora.text = 'loading...... ' + res
                urls.forEach((ele, index) => {
                    require("./dlpics")
                        (ele.path, 
                        path.join(download_dir, ele.name || ('folder' + index)),
                        ele.subtitle, 
                        ele.select, 
                        ele.attr).then(res => {
                            ora.stop()
                        })
                })
            })
            .catch(err => {
                console.log(err)
            })
    })



