import { Service } from '../service.schema'
import { serviceUrl } from '../services-util'

export const tandoor = {
  description:
    'The recipe manager that allows you to manage your ever growing collection of digital recipes.',
  iconUrl:
    'https://github.com/vabene1111/recipes/raw/develop/docs/logo_color.svg',
  id: 'tandoor',
  name: 'Tandoor Recipes',
  url: serviceUrl('https://docs.tandoor.dev/'),
} as const satisfies Service
