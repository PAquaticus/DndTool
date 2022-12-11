import { FastifyInstance } from 'fastify'
import * as controllers from '../controllers'
import { getSpecialAbility } from '../schema'

async function characterRouter(fastify: FastifyInstance) {
  fastify.decorateRequest('authUser', '')
  fastify.route({
    method: 'GET',
    url: '/:specialAbilityId',
    schema: getSpecialAbility,
    preHandler: [],
    handler: controllers.getSpecialAbility,
  })
  fastify.route({
    method: 'GET',
    url: '/',
    preHandler: [],
    handler: controllers.getAllSpecialAbilities,
  })
  fastify.route({
    method: 'POST',
    url: '/',
    preHandler: [],
    handler: controllers.postSpecialAbility,
  })
  fastify.route({
    method: 'PUT',
    url: '/:specialAbilityId',
    schema: getSpecialAbility,
    preHandler: [],
    handler: controllers.putSpecialAbility,
  })
}

export default characterRouter
