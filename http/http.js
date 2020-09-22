import LimitPromise from './limitPromise'
import got from 'got'

const limitPromise = new LimitPromise(10)

export const get = (url) => {
    return limitPromise.call(got.get, url)
}

export const post = (url, params) => {
    return limitPromise.call(got.post, url, params)
}

export const stream = url => {
    // return limitPromise.call(got.stream, url)
    got.stream(url)
}