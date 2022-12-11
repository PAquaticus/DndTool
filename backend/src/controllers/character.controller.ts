import { Character } from '@prisma/client'
import { FastifyReply, FastifyRequest } from 'fastify'
import { STANDARD } from '../helpers/constants'
import { handleServerError } from '../helpers/errors'
import { prisma } from '../helpers/utils'

export const getCharacter = async (
  request: FastifyRequest,
  reply: FastifyReply,
) => {
  try {
    const data = await prisma.character.findFirst({
      where: {
        id: request.params['characterId'],
      },
    })
    reply.status(STANDARD.SUCCESS).send({ data })
  } catch (e) {
    handleServerError(reply, e)
  }
}

export const postCharacter = async (
  request: FastifyRequest,
  reply: FastifyReply,
) => {
  try {
    const data = await prisma.character.create({
      data: request.body as Character,
    })
    reply.status(STANDARD.SUCCESS).send({ data })
  } catch (e) {
    handleServerError(reply, e)
  }
}

export const putCharacter = async (
  request: FastifyRequest,
  reply: FastifyReply,
) => {
  try {
    const data = await prisma.character.update({
      where: {
        id: request.params['characterId'],
      },
      data: request.body as Character,
    })
    reply.status(STANDARD.SUCCESS).send({ data })
  } catch (e) {
    handleServerError(reply, e)
  }
}