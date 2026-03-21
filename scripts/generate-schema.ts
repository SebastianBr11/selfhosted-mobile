import { toJsonSchema } from '@valibot/to-json-schema'
import { serviceSystem } from '@/lib/services.system'

const jsonSchema = toJsonSchema(serviceSystem.schema, {
  ignoreActions: ['check'],
})

jsonSchema.$id =
  'https://github.com/SebastianBr11/selfhosted-mobile/raw/refs/heads/main/schema.json'

const jsonString = JSON.stringify(jsonSchema, null, 2)
await Bun.write('schema.json', jsonString)
