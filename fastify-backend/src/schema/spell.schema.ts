import S from 'fluent-json-schema'

export const getSpellSchema = {
  params: S.object().prop('id', S.integer()),
}
