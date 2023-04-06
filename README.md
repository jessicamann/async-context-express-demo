# async-context-express-demo

A simple web server that uses Node's AsyncLocalStorage to pass on the request-id throughout the duration of a webrequest.

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