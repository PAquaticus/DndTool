import { FastifyInstance } from 'fastify'
import * as controllers from '../controllers'
import { getCharacterSchema } from '../schema'

async function characterRouter(fastify: FastifyInstance) {
  fastify.decorateRequest('authUser', '')
  fastify.route({
    method: 'GET',
    url: '/:characterId',
    schema: getCharacterSchema,
    preHandler: [],
    handler: controllers.getCharacter,
  })
  fastify.route({
    method: 'POST',
    url: '/',
    preHandler: [],
    handler: controllers.postCharacter,
  })
  fastify.route({
    method: 'PUT',
    url: '/:characterId',
    schema: getCharacterSchema,
    preHandler: [],
    handler: controllers.putCharacter,
  })
}

export default characterRouter
