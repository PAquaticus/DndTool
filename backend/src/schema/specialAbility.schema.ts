import { FastifySchema } from 'fastify'
import S from 'fluent-json-schema'

export const getSpecialAbility: FastifySchema = {
  params: S.object().prop('specialAbilityId', S.string().pattern(/[\w\d]{24}/)),
}
