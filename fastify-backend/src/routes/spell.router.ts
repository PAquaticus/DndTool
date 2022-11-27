import { FastifyInstance } from 'fastify'
import { createPostSchema } from '../schema'
import * as controllers from '../controllers'
import { checkValidRequest, checkValidUser } from '../helpers/auth'
import { getSpellSchema } from 'schema/spell.schema'

async function postRouter(fastify: FastifyInstance) {
  fastify.decorateRequest('authUser', '')
  fastify.route({
    method: 'GET',
    url: '/',
    schema: getSpellSchema,
    preHandler: [checkValidRequest, checkValidUser],
    handler: controllers.getSpell,
  })
}

export default postRouter
