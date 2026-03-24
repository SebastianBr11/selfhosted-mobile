import { toJsonSchema } from '@valibot/to-json-schema'
import { writeFileSync } from 'fs'
import { serviceSystem } from '@/features/services/lib/services.system'

export async function generateJsonSchema() {
  const jsonSchema = toJsonSchema(serviceSystem.schema, {
    ignoreActions: ['check'],
  })

  jsonSchema.$id =
    'https://github.com/SebastianBr11/selfhosted-mobile/raw/refs/heads/main/schema.json'

  const jsonString = JSON.stringify(jsonSchema, null, 2)
  writeFileSync('schema.json', jsonString)
}

generateJsonSchema()
