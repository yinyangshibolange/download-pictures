const request = require("./http");
const cheerio = require("cheerio");
const host = require("./util/host");
const ora = require("./util/ora")()

async function nextURL(pageHrefs, url, nextDomKey) {
    // ora.text = 'loading......获取页面与页面地址: ' + url
  pageHrefs.push(url);
  const { body } = await request.get(url);
  const $ = cheerio.load(body);
  const nextDom = $(nextDomKey).toArray();
  if (nextDom && nextDom.length > 0) {
    herf = host(url) + nextDom[0].attribs["href"];
    await nextURL(pageHrefs, herf, nextDomKey)
  }
}

async function getPicsUrl(url, adom, imgDom) {
    // ora.text = 'loading......获取 ' + url +' 的图片地址'
  const { body } = await request.get(url);
  const $ = cheerio.load(body);
  const a_arr = $(adom).toArray();
  const temp = [];
  for (let i = 0; i < a_arr.length; i++) {
    temp.push({
      name: '',
      path: host(url) + a_arr[i].attribs["href"],
      subtitle: '',
      select: imgDom,
      attr: "data-original",
    });
  }
  return temp;
}

module.exports = async () => {
  const pageHrefs = [];
  await nextURL(
    pageHrefs,
    "https://www.qqtn.com/tx/dongmantx_1.html",
    ".tsp_nav a.tsp_next"
  );

//   console.log(pageHrefs)

  let temp = [];
  for (let i = 0; i < pageHrefs.length; i++) {
    const arr = await getPicsUrl(
      pageHrefs[i],
      "ul.g-gxlist-imgbox li a",
      "#content  img"
    );
    // console.log(arr)
    temp = temp.concat(arr);
  }

//   console.log('temp:' , temp)

  return temp;
};
