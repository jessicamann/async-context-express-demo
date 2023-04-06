import { ctx, runWithCtx } from "./context.js"

const withinSomeFunction = (validator) => {
    validator()
}

const withinAnotherReallyComplicatedAsyncFunction = async (validator) => {
    return new Promise(() => {
        withinSomeFunction(validator)
    })
}

describe('ctx', () => {
    it('sets the request-id for access by later promises throughout a function\'s child sync & async processes', () => {
        runWithCtx(async () => {
            ctx.setRequestId('some-unique-id')
            
            withinSomeFunction(
                () => expect(ctx.getRequestId()).toEqual('some-unique-id')
            )
            
            withinAnotherReallyComplicatedAsyncFunction(
                async () => await expect(ctx.getRequestId()).toEqual('some-unique-id')
            )
        })
    })

    it('uses separate context store in different function flows', () => {
        runWithCtx(() => {
            ctx.setRequestId('FOO')

            withinSomeFunction(() => expect(ctx.getRequestId()).toEqual('FOO'))
        })

        runWithCtx(() => {
            ctx.setRequestId('BAR')

            withinSomeFunction(() => expect(ctx.getRequestId()).toEqual('BAR'))
        })
    })

    it('creates a new store if child process is run with new context', () => {
        runWithCtx(() => {
            ctx.setRequestId('PARENT')

            withinSomeFunction(() => expect(ctx.getRequestId()).toEqual('PARENT'))
            
            runWithCtx(() => {
                ctx.setRequestId('CHILD')
    
                withinSomeFunction(() => expect(ctx.getRequestId()).toEqual('CHILD'))
            })

            withinSomeFunction(() => expect(ctx.getRequestId()).toEqual('PARENT'))
        })
    })
})