# async-context-express-demo

A simple web server that uses Node's AsyncLocalStorage to pass on the request-id throughout the duration of a webrequest.

> **A note about these contexts:**
>
> Contexts should not be used as a way to propagate and pass on data needed to child processes. It should only be used to store informational data that may need to be accessed on multiple nested level within a process & its child processes. 
>
> A common example is a request-id to tie the activities throughout a web request together for logging.

# See it in action

Make sure you have node installed. This demo was created using Node v18.

```
node --version
```

Start the app

```
npm run start
```

In a separate shell, run the following to execute 10 requests (up to 3 in parallel)

```
./run
```

# How it works

## Wrap all web request processing in a context

An express middleware wraps every inbound webrequest within a context, as defined in the server:

```js
// index.js

const app = express()
const port = 3000

app.use(withRequestContext)
```

This `withRequestContext` middleware sets a request-id in the context for the duration of the web request.

The middleware itself is quite simple - it just wraps the request and moves on:

```js
// logger/middlewares.js

const withRequestContext = (req, res, next) => {
    const requestId = getOrGenerateRequestId(req)
    runWithCtx(() => {
        ctx.setRequestId(requestId)
        next()
    })
}
```

> ⭐️💫 Checkout [OpenTelemetry](https://opentelemetry.io/) if you are looking to logs across services together. It's a much more robust solution for that purpose.

## Managing context

Lastly, contexts are managed separately, with explicit accessors defined to prevent polluting the context.

If a process requires a shared context, the consuming function can use the `runWithCtx()` function to wrap the process. Child processes can therefore access the (explicitly managed) shared items from the store by using methods on the `ctx`.

```js
// logger/context.js

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
```
