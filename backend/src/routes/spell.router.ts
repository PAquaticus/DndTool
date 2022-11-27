import { FastifyInstance } from 'fastify'
import * as controllers from '../controllers'
import { checkValidRequest, checkValidUser } from '../helpers/auth'
import { getSpellSchema } from '../schema'

async function spellRouter(fastify: FastifyInstance) {
  fastify.decorateRequest('authUser', '')
  fastify.route({
    method: 'GET',
    url: '/:spellId',
    handler: controllers.getSpell,
  })
  fastify.route({
    method: 'GET',
    url: '/',
    handler: controllers.getAllSpells,
  })
}

export default spellRouter
