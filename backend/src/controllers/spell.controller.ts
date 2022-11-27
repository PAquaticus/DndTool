import { FastifyReply, FastifyRequest } from 'fastify'
import { STANDARD } from '../helpers/constants'
import { handleServerError } from '../helpers/errors'
import { prisma } from '../helpers/utils'

export const getSpell = async (
  request: FastifyRequest,
  reply: FastifyReply,
) => {
  try {
    const data = await prisma.spell.findFirst({
      where: {
        id: request.params['spellId'],
      },
    })
    reply.status(STANDARD.SUCCESS).send({ data })
  } catch (e) {
    handleServerError(reply, e)
  }
}

export const getAllSpells = async (
  request: FastifyRequest,
  reply: FastifyReply,
) => {
  try {
    const data = await prisma.spell.findMany({
      where: {
        name: request.params['spellId'],
      },
      select: {
        name: true,
        id: true,
      },
    })
    reply.status(STANDARD.SUCCESS).send({ data })
  } catch (e) {
    handleServerError(reply, e)
  }
}
