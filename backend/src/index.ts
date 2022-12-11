import { utils } from './helpers/utils'
import fastify from 'fastify'
import pino from 'pino'
import loadConfig from './config'
import spellRouter from './routes/spell.router'
import characterRouter from './routes/character.router'
import specialAbilityRouter from './routes/specialAbility.router'
loadConfig()

const port = process.env.API_PORT || 5000
const startServer = async () => {
  try {
    const server = fastify({
      logger: pino({ level: 'info' }),
    })
    server.register(require('fastify-formbody'))
    server.register(require('fastify-cors'), {
      origin: ['http://localhost:5173'],
    })
    server.register(require('fastify-helmet'))
    server.register(spellRouter, { prefix: '/api/spell' })
    server.register(characterRouter, { prefix: '/api/character' })
    server.register(specialAbilityRouter, { prefix: '/api/specialAbility' })
    server.setErrorHandler((error, request, reply) => {
      server.log.error(error)
    })
    server.get('/', (request, reply) => {
      reply.send({ name: 'fastify-typescript' })
    })
    server.get('/health-check', async (request, reply) => {
      try {
        await utils.healthCheck()
        reply.status(200).send()
      } catch (e) {
        reply.status(500).send()
      }
    })
    if (process.env.NODE_ENV === 'production') {
      for (const signal of ['SIGINT', 'SIGTERM']) {
        process.on(signal, () =>
          server.close().then((err) => {
            console.log(`close application on ${signal}`)
            process.exit(err ? 1 : 0)
          }),
        )
      }
    }
    await server.listen(port)
  } catch (e) {
    console.error(e)
  }
}

process.on('unhandledRejection', (e) => {
  console.error(e)
  process.exit(1)
})

startServer()
