import { ctx } from './context.js'

const logger = {
    info: (msg) => log('info', msg)
}

const log = (level, msg) => {
    const timestampe = new Date().toUTCString()
    const requestId = ctx.getRequestId()

    console.log(`timestamp=${timestampe} level=${level} requestId=${requestId}: ${msg}`)
}

export { logger }