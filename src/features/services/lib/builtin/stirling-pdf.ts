import { Service } from '../service.schema'
import { serviceUrl } from '../services-util'

export const stirlingpdf = {
  description:
    "The world's most secure PDF platform. AI-native and completely private.",
  iconUrl:
    'https://cdn.jsdelivr.net/gh/homarr-labs/dashboard-icons/svg/stirling-pdf.svg',
  id: 'stirling-pdf',
  name: 'Stirling PDF',
  url: serviceUrl('https://www.stirling.com'),
} as const satisfies Service
