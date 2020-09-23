module.exports =  require("./cached")(function(url) {
        const protocl = url.substr(0, url.indexOf('://') + 3)
        const tempurl = url.substr(url.indexOf('://') + 3)
        const host = tempurl.substr(0, tempurl.indexOf("/"))
        return protocl + host
    })
