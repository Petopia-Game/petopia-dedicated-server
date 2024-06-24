const child_process = require('child_process')

const { GAME_ID, GAME_ENV, API_KEY } = process.env

console.log(`game id: ${GAME_ID}`)
console.log(`game env: ${GAME_ENV}`)
console.log(`game api key: ${API_KEY}`)

const createInstance = (gameId, apiKey, gameEnv, port) => {
    try {
        const instancePath = __dirname + '/build/server.x86_64'
        const args = ["-game_id", `${gameId}`, "-api_key", `${apiKey}`, "-game_env", `${gameEnv}`, "-port", `${port}`]

        const child = child_process.spawn(instancePath, args)
        console.log('instance spawned')
        child.stdout.on("data", (data) => {
            console.log(`match ${gameId} ${port} data: ${data}`)
        })
        child.on("spawn", () => {
            console.log(`match ${gameId} ${port} spawned`)
        })
        child.on("disconnect", (code, signal) => {
            console.log(`match ${gameId} ${port} closed ${code} ${signal}`)
        })
        child.on("message", (code, signal) => {
            console.log(`match ${gameId} ${port} message ${code} ${signal}`)
        })
        child.on("error", (code, signal) => {
            console.log(`match ${gameId} ${port} error ${code} ${signal}`)
        })
        child.on("exit", (code, signal) => {
            console.log(`match ${gameId} ${port} exit ${code} ${signal}`)
        });
    } catch (err) {
        console.error(err)
    }
}


createInstance(GAME_ID, API_KEY, GAME_ENV, 26000)