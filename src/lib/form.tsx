import { createFormHook, createFormHookContexts } from '@tanstack/react-form'
import Label from '@/components/label'
import { TextInput } from '@/components/text-input'
import { ThemedView } from '@/components/themed-view'

const { fieldContext, formContext, useFieldContext } = createFormHookContexts()

type FormTextInputProps = {
  disabled?: boolean
  label: string
}
function FormTextInput({ disabled = false, label }: FormTextInputProps) {
  const field = useFieldContext<string>()

  return (
    <ThemedView style={{ gap: 8 }}>
      <Label disabled={disabled}>{label}</Label>
      <TextInput
        editable={!disabled}
        onBlur={field.handleBlur}
        onChangeText={field.handleChange}
        value={field.state.value}
      />
      {!field.state.meta.isValid && (
        <Label disabled={disabled} isError>
          {field.state.meta.errors[0].message}
        </Label>
      )}
    </ThemedView>
  )
}

// Allow us to bind components to the form to keep type safety but reduce production boilerplate
// Define this once to have a generator of consistent form instances throughout your app
export const { useAppForm } = createFormHook({
  fieldComponents: {
    FormTextInput,
  },
  fieldContext,
  formComponents: {},
  formContext,
})
