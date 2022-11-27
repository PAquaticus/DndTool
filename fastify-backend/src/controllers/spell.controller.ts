import { FastifyReply, FastifyRequest } from 'fastify'
import { STANDARD } from '../helpers/constants'
import { handleServerError } from '../helpers/errors'
import { prisma } from '../helpers/utils'

export const getSpell = async (
  request: FastifyRequest,
  reply: FastifyReply,
) => {
  try {
    const post = await prisma.spell.findFirst({
      where: {
        id: request.params['id'],
      },
    })
    reply.status(STANDARD.SUCCESS).send({ data: post })
  } catch (e) {
    handleServerError(reply, e)
  }
}
