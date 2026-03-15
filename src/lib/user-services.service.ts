import { fetch } from 'expo/fetch'
import { serviceSystem } from './services.system'

export async function fetchUserServices(url: string) {
  const data = await fetch(url).then((res) => res.json())
  console.log(data)
  const parseResult = serviceSystem.parse(data)
  return {
    services: parseResult.output,
    errors: parseResult.issues,
    success: parseResult.success,
  }
}
