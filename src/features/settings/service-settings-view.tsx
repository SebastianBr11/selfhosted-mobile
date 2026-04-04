import { ThemedText } from '@/components/themed-text'

type ServiceSettingsViewProps = {
  serviceId: string
}
export default function ServiceSettingsView({
  serviceId,
}: ServiceSettingsViewProps) {
  return (
    <>
      <ThemedText>Service {serviceId}</ThemedText>
    </>
  )
}
