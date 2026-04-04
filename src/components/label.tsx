import { ThemedText } from './themed-text'

type LabelProps = {
  children: React.ReactNode
  disabled?: boolean
  isError?: boolean
}
export default function Label({
  children,
  disabled = false,
  isError = false,
}: LabelProps) {
  if (isError) {
    return (
      <ThemedText disabled={disabled} type="error">
        {children}
      </ThemedText>
    )
  }

  return (
    <ThemedText disabled={disabled} themeColor="textPrimary" type="label">
      {children}
    </ThemedText>
  )
}
