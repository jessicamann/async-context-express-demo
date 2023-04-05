import { logger } from '../logger/log.js'

const pokemons = ["Pikachu", "Charizard", "Snorlax", "Ditto", "Charmander", "Gardevoir"]

const randomInt = (max) => Math.floor(Math.random() * max)

const randomPokemon = () => {
    const luckyPokemon = pokemons[randomInt(5)]

    return new Promise(resolve => {
        setTimeout(() => {
            logger.info(`Successfully retrieved pokemon: ${luckyPokemon}`)
            resolve(luckyPokemon)
        }, randomInt(5000))
    })
}

export { randomPokemon }