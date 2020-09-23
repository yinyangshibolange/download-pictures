// const { url } = require("inspector")

// const downhtml = async url => {
//     const { body } = await require("./http").get(url)
//     require("fs").writeFile('./test.html', body, function() {
//         console.log(  url + '下载成功')
//     } )
// }

// downhtml('https://www.qqtn.com/article/article_104174_1.html')

const a = require("./util/ora")({
    text: 'load'
})

const b = require("./util/ora")({
    text: 'loading'
})

console.log(a === b)
// a.start()
b.start()