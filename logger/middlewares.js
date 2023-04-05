import { v4 as uuidv4 } from 'uuid';
import { ctx, runWithCtx } from './context.js'
import { logger } from './log.js';

const getOrGenerateRequestId = (req) => {
    const requestId = req.header('request-id')
    return requestId || uuidv4()
}

const withRequestContext = (req, res, next) => {
    const requestId = getOrGenerateRequestId(req)
    runWithCtx(() => {
        ctx.setRequestId(requestId)
        next()
    })
}

const logRequests = (req, res, next) => {
    logger.info(`Received request: ${req.method} ${req.path}`)
    next()
}

export { withRequestContext, logRequests }