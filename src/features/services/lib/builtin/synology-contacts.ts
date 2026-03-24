import { Service } from '../service.schema'

export const synologyContacts = {
  description:
    'Create, manage, sync, and share contacts with anyone from a single platform.',
  iconUrl:
    'https://cdn.jsdelivr.net/gh/homarr-labs/dashboard-icons/png/synology-contacts.png',
  id: 'synology-contacts',
  name: 'Synology Contacts',
  url: 'https://www.synology.com/en-global/dsm/feature/contacts',
} as const satisfies Service
