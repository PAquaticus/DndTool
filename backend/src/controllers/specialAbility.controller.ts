import { SpecialAbility } from '@prisma/client'
import { FastifyReply, FastifyRequest } from 'fastify'
import { STANDARD } from '../helpers/constants'
import { handleServerError } from '../helpers/errors'
import { prisma } from '../helpers/utils'

export const getSpecialAbility = async (
  request: FastifyRequest,
  reply: FastifyReply,
) => {
  try {
    const data = await prisma.specialAbility.findFirst({
      where: {
        id: request.params['SpecialAbilityId'],
      },
    })
    reply.status(STANDARD.SUCCESS).send({ data })
  } catch (e) {
    handleServerError(reply, e)
  }
}

export const getAllSpecialAbilities = async (
  request: FastifyRequest,
  reply: FastifyReply,
) => {
  try {
    const data = await prisma.specialAbility.findMany({
      select: {
        name: true,
        id: true,
        origin: true,
      },
    })
    reply.status(STANDARD.SUCCESS).send({ data })
  } catch (e) {
    handleServerError(reply, e)
  }
}

export const postSpecialAbility = async (
  request: FastifyRequest,
  reply: FastifyReply,
) => {
  try {
    const data = await prisma.specialAbility.create({
      data: request.body as SpecialAbility,
    })
    reply.status(STANDARD.SUCCESS).send({ data })
  } catch (e) {
    handleServerError(reply, e)
  }
}

export const putSpecialAbility = async (
  request: FastifyRequest,
  reply: FastifyReply,
) => {
  try {
    const data = await prisma.specialAbility.update({
      where: {
        id: request.params['SpecialAbilityId'],
      },
      data: request.body as SpecialAbility,
    })
    reply.status(STANDARD.SUCCESS).send({ data })
  } catch (e) {
    handleServerError(reply, e)
  }
}
