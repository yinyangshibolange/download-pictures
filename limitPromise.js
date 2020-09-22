
export default class LimitPromise {
    constructor(max) {
        this.max = max // 异步任务上限
        this._taskQueue = [] // 任务队列
        this._count = 0 // 执行中任务计数

    }

    call(caller, ...args) {
        return new Promise((resolve, reject) => {
            const _task = this._createStack(caller, args, resolve, reject)
            if(this._count >= this.max) {
                this._taskQueue.push(_task)
            } else {
                _task()
            }
        })
        
    }

    _createStack(caller, args, resolve, reject) {
        return () => {
            caller(args)
                .then(resolve)
                .catch(reject)
                .finally(() => {
                    this._count--
                    if(this._taskQueue.length) {
                        const task = this._taskQueue.shift()
                        task()
                    } else {
                        // 任务执行完了
                    }
                })
            this._count++
        }
       
    }
}