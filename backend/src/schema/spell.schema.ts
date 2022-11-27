import { FastifySchema } from 'fastify'
import S from 'fluent-json-schema'

export const getSpellSchema: FastifySchema = {
  params: S.object().prop('spellId', S.string()),
}
