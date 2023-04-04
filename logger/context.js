import { AsyncLocalStorage } from 'node:async_hooks';

const asyncLocalStorage = new AsyncLocalStorage();
const setSafely = (key, value) => asyncLocalStorage.getStore()?.set(key, value)
const retrieveSafely = (key) => asyncLocalStorage.getStore()?.get(key)

const ctx = {
    setRequestId: (value) => setSafely('request-id', value),
    getRequestId: () => retrieveSafely('request-id'),
}

const runWithCtx = (fn) => {
    const store = new Map()
    return asyncLocalStorage.run(store, () => {
        fn()
    })
}

export { ctx, runWithCtx }