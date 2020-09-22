const fs = require("fs")
const path = require("path")
const cheerio = require("cheerio")
const request = require("request")
const mkDir = require("./util/makeDir")

const keyword = 'tongxiangyu'
const urlarr = [1,2,3,4].map(num => `https://www.fabiaoqing.com/search/bqb/keyword/%E4%BD%9F%E6%B9%98%E7%8E%89/type/bq/page/${num}.html`)
  
  const downloadPics =  (htmlurl, subDir, subTitle) => {
     request(htmlurl, function(error, response, body) {
         if(error) {
             console.log(error)
             return error
         }
        // console.log(body)
        const $ = cheerio.load(body)
        const pics = $("#container #bqb .searchbqppdiv.tagbqppdiv > a > img").toArray()
        if(pics.length === 0) {
            return
        }
        const dir = path.join(__dirname, './download', subDir)
        mkDir(dir)
            .then(msg => {
                for(let i =0 ;i< pics.length; i++) {
                    const dataOriginal = pics[i].attribs["data-original"]
                    const pathSrc = subTitle +'_img' + i + '_' + path.basename(dataOriginal)
                    request(dataOriginal).pipe(fs.createWriteStream(path.join(dir, pathSrc))).on('close', function() {
                        console.log('------[' + pathSrc +'保存成功]------')
                    })
                }
            })
            .catch(err => {
                console.log(err)
            })
    })
  }
  urlarr.forEach((ele, index) => {
    downloadPics(ele, keyword, 'page' +( index+ 1))
  })