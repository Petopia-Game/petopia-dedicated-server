const child_process = require('child_process')

const gameId = process.env.GAME_ID

console.log(`game id: ${gameId}`)

const createInstance = (gameId, port) => {
    try {
        const instancePath = __dirname + '/build/server.x86_64'
        const args = ["-game_id", `${gameId}`, "-port", `${port}`]

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

createInstance(gameId, 26000)