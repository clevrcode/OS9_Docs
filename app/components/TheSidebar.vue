<template>
  <div>
    <USidebar
      :open="open"
      collapsible="icon"
      rail
      :ui="{
        container: 'h-full',
        inner: 'bg-elevated/25 divide-transparent',
        body: 'py-0',
      }"
    >
      <template #header>
        <UIcon name="i-logos-nuxt-icon" class="size-8" />
      </template>

      <UNavigationMenu
        :items="navitems"
        orientation="vertical"
        :ui="{ link: 'p-1.5 overflow-hidden' }"
      />
    </USidebar>
  </div>
</template>

<script setup lang="ts">
import type { NavigationMenuItem } from '@nuxt/ui'

const props = defineProps({
  open: {
    type: Boolean,
    required: true,
  },
})

const navitems: NavigationMenuItem[] = [
  {
    label: 'Home',
    icon: 'i-carbon-home',
    active: true,
    to: '/', // TODO
  },
  {
    label: 'Kernel',
    icon: 'i-boxicons-nut',
    active: true,
    to: '/kernel', // TODO
  },
  {
    label: 'Memory Modules',
    icon: 'i-streamline-ultimate-module-three',
  },
  {
    label: 'Unified I/O',
    icon: 'i-oui-input-output',
  },
  {
    label: 'System Calls',
    icon: 'i-ix-operating-system-settings',
    defaultOpen: true,
    children: [
      {
        label: 'I/O',
        children: [
          {
            label: 'Attach',
            icon: 'i-iconmind-chapter-outline-thin',
            to: '/syscall/128',
          },
          {
            label: 'Change Dir',
            icon: 'i-iconmind-chapter-outline-thin',
            to: '/syscall/134',
          },
          {
            label: 'Close Path',
            icon: 'i-iconmind-chapter-outline-thin',
          },
          {
            label: 'Create File',
            icon: 'i-iconmind-chapter-outline-thin',
          },
          {
            label: 'Delete File',
            icon: 'i-iconmind-chapter-outline-thin',
          },
        ],
      },
      {
        label: 'User',
        defaultExpanded: true,
        children: [
          {
            label: 'Allocate Bits',
            icon: 'i-iconmind-chapter-outline-thin',
          },
          {
            label: 'Chain',
            icon: 'i-iconmind-chapter-outline-thin',
          },
          {
            label: 'Compare Names',
            icon: 'i-iconmind-chapter-outline-thin',
          },
          {
            label: 'CRC',
            icon: 'i-iconmind-chapter-outline-thin',
          },
          {
            label: 'Deallocate Bits',
            icon: 'i-iconmind-chapter-outline-thin',
          },
          {
            label: 'Exit',
            icon: 'i-iconmind-chapter-outline-thin',
          },
        ],
      },
      {
        label: 'System',
        defaultExpanded: true,
        children: [
          {
            label: 'Allocate 64',
            icon: 'i-iconmind-chapter-outline-thin',
          },
          {
            label: 'Find 64',
            icon: 'i-iconmind-chapter-outline-thin',
          },
          {
            label: 'I/O Delete',
            icon: 'i-iconmind-chapter-outline-thin',
          },
          {
            label: 'I/O Queue',
            icon: 'i-iconmind-chapter-outline-thin',
          },
          {
            label: 'Insert Process',
            icon: 'i-iconmind-chapter-outline-thin',
          },
          {
            label: 'Next Process',
            icon: 'i-iconmind-chapter-outline-thin',
          },
        ],
      },
    ],
  },
]
</script>

<style scoped></style>
