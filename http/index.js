const LimitPromise = require('./limitPromise')
const requestPromise = require("../util/requestPromise")
const limitPromise = new LimitPromise(10)

module.exports.get = (url) => {
    return limitPromise.call(requestPromise.get, url)
}

module.exports.post = (url, params) => {
    return limitPromise.call(requestPromise.post, url, params)
}

module.exports.stream = (url, path) => {
    return limitPromise.call(requestPromise.stream, url, path)
}