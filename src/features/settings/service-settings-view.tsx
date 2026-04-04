import { useLingui } from '@lingui/react/macro'
import { ScrollView, StyleSheet } from 'react-native'
import { ThemedView } from '@/components/themed-view'
import { useAppForm } from '@/lib/form'
import { isString } from '@/util/is-type'
import { Service, ServiceSchema } from '../services/lib/service.schema'

type ServiceSettingsViewProps = {
  builtIn: Service
  service: Service
  updateService: (service: Partial<Service>) => void
}
export default function ServiceSettingsView({
  builtIn,
  service,
  updateService,
}: ServiceSettingsViewProps) {
  const { t } = useLingui()
  const form = useAppForm({
    defaultValues: {
      ...service,
    },
    listeners: {
      onChange({ fieldApi }) {
        if (fieldApi.state.meta.isValid) {
          updateService({
            [fieldApi.name]:
              fieldApi.state.value ||
              builtIn[fieldApi.name as keyof typeof builtIn],
          })
        }
      },
    },
    validators: {
      onChange: ServiceSchema,
    },
  })
  return (
    <ScrollView>
      <ThemedView inlineInset style={styles.container}>
        <form.AppField name="name">
          {(field) => <field.FormTextInput label={t`Service Name`} />}
        </form.AppField>
        <form.AppField name="url">
          {(field) => <field.FormTextInput label={t`Service URL`} />}
        </form.AppField>
        <form.AppField name="description">
          {(field) => <field.FormTextInput label={t`Description`} multiline />}
        </form.AppField>
        <form.AppField name="appStoreLink">
          {(field) => (
            <field.FormTextInput
              disabled={
                !(
                  isString(service.appStoreLink) ||
                  service.appStoreLink === undefined
                )
              }
              label={t`App Store Link`}
            />
          )}
        </form.AppField>
        <form.AppField name="iconUrl">
          {(field) => (
            <field.FormTextInput
              disabled={!isString(service.iconUrl)}
              label={t`Icon URL`}
            />
          )}
        </form.AppField>
        <form.AppField name="packageName">
          {(field) => <field.FormTextInput label={t`Android Package Name`} />}
        </form.AppField>
      </ThemedView>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  container: {
    gap: 16,
    marginVertical: 16,
  },
})
