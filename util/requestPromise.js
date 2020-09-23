const request = require("request")
const fs = require("fs")

module.exports.get = (url) => {
    return new Promise((resolve, reject) => {
        request.get(url, function(error, response, body) {
            if(error) {
                reject(error)
                return 
            }
            resolve({
                response,
                body
            })
        })
    })

}

module.exports.post = (url, params) => {
    // console.log(url, params)
    return new Promise((resolve, reject) => {
        request.post({url, form: params}, function(error, response, body) {
            if(error) {
                reject(error)
                return 
            }
            resolve({
                response,
                body
            })
        })
    })
}

module.exports.stream =  (url, path) => {
    // console.log(url, path)
    return new Promise((resolve, reject) => {
        const stream = fs.createWriteStream(path)
        stream.on('error', function(err) {
            stream.close()
            console.log(err)
            resolve('跳过继续下一个')
        })
      
        request(url).pipe(stream)
        .on('error', function(err) {
            console.log(err)
            resolve('跳过继续下一个')
        })
        .on('close', function() {
            resolve('下载完成')
        })
    })
}