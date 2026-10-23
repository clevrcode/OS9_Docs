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
const store = useSyscallStore()

const props = defineProps({
  open: {
    type: Boolean,
    required: true,
  },
})

const navitems = ref<NavigationMenuItem[]>([
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
])

const iolinks = computed(() => store.syscall_list)
watch(iolinks, (newLinks, _) => {
  console.log('IO links updated')
  let link_io = []
  let link_sys = []
  for (const call of newLinks) {
    if (call.function[0] == 'I') {
      link_io.push({
        label: call.function,
        icon: 'i-iconmind-chapter-outline-thin',
        to: `/syscall/${call.code}`,
      })
    } else if (call.function[0] == 'F') {
      link_sys.push({
        label: call.function,
        icon: 'i-iconmind-chapter-outline-thin',
        to: `/syscall/${call.code}`,
      })
    }
  }
  console.log(link_io)
  console.log(link_sys)
  navitems.value.push({
    label: 'System Calls',
    icon: 'i-ix-operating-system-settings',
    defaultOpen: true,
    children: [
      {
        label: 'I/O',
        children: link_io,
      },
      {
        label: 'System',
        children: link_sys,
      },
    ],
  })
})
</script>

<style scoped></style>
