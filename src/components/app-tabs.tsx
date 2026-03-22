import { useLingui } from '@lingui/react/macro'
import { NativeTabs } from 'expo-router/unstable-native-tabs'
import React from 'react'

export default function AppTabs() {
  const { t } = useLingui()
  return (
    <NativeTabs>
      <NativeTabs.Trigger name="index">
        <NativeTabs.Trigger.Label>{t`Home`}</NativeTabs.Trigger.Label>
        <NativeTabs.Trigger.Icon md="home" sf="house.fill" />
      </NativeTabs.Trigger>
      <NativeTabs.Trigger name="settings">
        <NativeTabs.Trigger.Label>{t`Settings`}</NativeTabs.Trigger.Label>
        <NativeTabs.Trigger.Icon md="settings" sf="gear" />
      </NativeTabs.Trigger>
    </NativeTabs>
  )
}
