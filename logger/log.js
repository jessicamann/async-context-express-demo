const logger = {
    info: (msg) => log('info', msg)
}

const log = (level, msg) => {
    const timestampe = new Date().toUTCString()
    console.log(`${timestampe} ${level}: ${msg}`)
}

export { logger }