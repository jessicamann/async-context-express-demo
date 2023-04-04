import express from 'express'
import { randomPokemon } from './app/pokemon-namer.js'

const app = express()
const port = 3000

app.get('/', (req, res) => {
    res.send('Hello World!')
})

app.get('/pokemon', async (req, res) => {
    const pokemon = await randomPokemon()
    res.send(`Your lucky pokemon is...${pokemon}!`)
})

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})

