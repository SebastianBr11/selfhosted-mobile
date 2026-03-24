import {
  AlertDialog as BaseAlertDialog,
  AlertDialogProps as BaseAlertDialogProps,
} from '@expo/ui/jetpack-compose'
import { useState } from 'react'

type AlertDialogProps = Pick<
  BaseAlertDialogProps,
  | 'confirmButtonText'
  | 'dismissButtonText'
  | 'onConfirmPressed'
  | 'onDismissPressed'
  | 'text'
  | 'title'
>
export default function AlertDialog({
  onConfirmPressed,
  onDismissPressed,
  ...props
}: AlertDialogProps) {
  const [visible, setVisible] = useState(true)
  return (
    <BaseAlertDialog
      onConfirmPressed={() => {
        setVisible(false)
        onConfirmPressed?.()
      }}
      onDismissPressed={() => {
        setVisible(false)
        onDismissPressed?.()
      }}
      visible={visible}
      {...props}
    />
  )
}
