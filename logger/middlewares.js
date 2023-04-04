import { v4 as uuidv4 } from 'uuid';
import { ctx, runWithCtx } from './context.js'

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

export { withRequestContext }