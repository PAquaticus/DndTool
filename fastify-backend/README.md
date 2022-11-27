# Fastify-Typescript
typescript based rest-API architecture with prisma and fastify framework.

## How to use

### 1. Clone this repo & install dependencies

Install Node dependencies:

`npm install`

### 2. Set up the database

This uses [Postgres database](https://www.postgresql.org/).

To set up your database, run:

```sh
npm run prisma:save
npm run prisma:dep
```

### 3. Generate Prisma Client (type-safe database client)

Run the following command to generate [Prisma Client](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/generating-prisma-client):

```sh
npm run prisma:gen
```

### 4. Start the Fastify server

Launch your Fastify server with this command:

```sh
npm run dev
```

## For Build Generation

Build server with command: 

```sh
npm run build
```

## Prisma documentation
- Check out the [Prisma docs](https://www.prisma.io/docs/)
- Check out the [Fastify docs](https://www.fastify.io/docs/latest/)




# How to schema.ts

```typescript
const S = require('fluent-json-schema')

// You can have an object like this, or query a DB to get the values
const MY_KEYS = {
  KEY1: 'ONE',
  KEY2: 'TWO'
}

const bodyJsonSchema = S.object()
  .prop('someKey', S.string())
  .prop('someOtherKey', S.number())
  .prop('requiredKey', S.array().maxItems(3).items(S.integer()).required())
  .prop('nullableKey', S.mixed([S.TYPES.NUMBER, S.TYPES.NULL]))
  .prop('multipleTypesKey', S.mixed([S.TYPES.BOOLEAN, S.TYPES.NUMBER]))
  .prop('multipleRestrictedTypesKey', S.oneOf([S.string().maxLength(5), S.number().minimum(10)]))
  .prop('enumKey', S.enum(Object.values(MY_KEYS)))
  .prop('notTypeKey', S.not(S.array()))

const queryStringJsonSchema = S.object()
  .prop('name', S.string())
  .prop('excitement', S.integer())

const paramsJsonSchema = S.object()
  .prop('par1', S.string())
  .prop('par2', S.integer())

const headersJsonSchema = S.object()
  .prop('x-foo', S.string().required())

// Note that there is no need to call `.valueOf()`!
const schema = {
  body: bodyJsonSchema,
  querystring: queryStringJsonSchema, // (or) query: queryStringJsonSchema
  params: paramsJsonSchema,
  headers: headersJsonSchema
}

fastify.post('/the/url', { schema }, handler)
```