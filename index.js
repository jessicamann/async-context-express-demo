import express from 'express'
import { randomPokemon } from './app/pokemon-namer.js'
import { withRequestContext, logRequests } from './logger/middlewares.js'
import { logger } from './logger/log.js'

const app = express()
const port = 3000

app.use(withRequestContext)
app.use(logRequests)

app.get('/', (req, res) => {
    res.send('Hello World!')
})

app.get('/pokemon/:num', async (req, res) => {
    const pokemon = await randomPokemon()
    res.send(`Your lucky pokemon is...${pokemon}!\n`)
})

app.listen(port, () => {
    logger.info(`Example app listening on port ${port}`)
})

