const fs = require("fs");
const path = require("path");
const cheerio = require("cheerio");
const request = require("./http");
const mkDir = require("./util/makeDir");
const ora = require("./util/ora")();

// const keyword = 'tongxiangyu'
// const urlarr = [1,2,3,4].map(num => `https://www.fabiaoqing.com/search/bqb/keyword/%E4%BD%9F%E6%B9%98%E7%8E%89/type/bq/page/${num}.html`)

module.exports = async (htmlurl, dir, subTitle, imgSelector, imgAttribs) => {
  ora.text = "loading......获取页面: " + htmlurl;
  const { body } = await request.get(htmlurl);

  const $ = cheerio.load(body);
  const domSelert = false || imgSelector || "img";
  const pics = $(domSelert).toArray();

  if (pics.length === 0) {
    return;
  }
  console.log('创建' + dir + '文件夹')
  const msg = await mkDir(dir);
  ora.text = "loading......创建目录: " + msg;

  for (let i = 0; i < pics.length; i++) {
    const dataOriginal =
      pics[i].attribs[imgAttribs] ||
      pics[i].attribs["data-original"] ||
      pics[i].attribs["src"];

    const pathSrc = subTitle + "_img" + i + "_" + path.basename(dataOriginal);
    const filepath = path.join(dir, pathSrc);
    const stats = fs.statSync(filepath);
    if (stats) {
      ora.text = "loading......下载中: " + filepath + "已存在";
      return;
    }
    ora.text = "loading......下载中: " + filepath;
    const resdata = await request.stream(dataOriginal, filepath);

  }
};
