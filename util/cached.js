module.exports = fn => {
    const cache = Object.create(null)
    return (function cachedFn(str) {
        const hited = cache[str]
        return hited || (cache[str] = fn(str))
    })
}