import { FastifySchema } from 'fastify'
import S from 'fluent-json-schema'

export const getCharacterSchema: FastifySchema = {
  params: S.object().prop('characterId', S.string().pattern(/[\w\d]{24}/)),
}
