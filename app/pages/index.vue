<template>
  <div class="flex flex-1">
    <!-- :class="[
      variant === 'inset' && 'bg-neutral-50 dark:bg-neutral-950',
      side === 'right' && 'flex-row-reverse',
    ]" -->
    <USidebar
      v-model:open="open"
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

    <div
      class="flex-1 flex flex-col overflow-hidden lg:peer-data-[variant=floating]:my-4 peer-data-[variant=inset]:m-4 lg:peer-data-[variant=inset]:not-peer-data-[collapsible=offcanvas]:ms-0 peer-data-[variant=inset]:rounded-xl peer-data-[variant=inset]:shadow-sm peer-data-[variant=inset]:ring peer-data-[variant=inset]:ring-default bg-default"
    >
      <div
        class="h-(--ui-header-height) shrink-0 flex items-center px-4"
        :class="[
          variant !== 'floating' && 'border-b border-default',
          side === 'right' && 'justify-end',
        ]"
      >
        <UButton
          :icon="side === 'left' ? 'i-lucide-panel-left' : 'i-lucide-panel-right'"
          color="neutral"
          variant="ghost"
          aria-label="Toggle sidebar"
          @click="open = !open"
        />
      </div>
      <div class="flex-1 p-4">
        <!-- <Placeholder class="size-full" /> -->
        <UPageHero title="OS9 Documentation" description="Complete OS9 documentation." />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { NavigationMenuItem, SidebarProps } from "@nuxt/ui"

// Ignore the props for the example
defineProps<Pick<SidebarProps, "variant" | "collapsible" | "side">>()

const open = ref(true)

const navitems: NavigationMenuItem[] = [
  {
    label: "Kernel",
    icon: "i-boxicons-nut",
    active: true,
    to: "/kernel", // TODO
  },
  {
    label: "Memory Modules",
    icon: "i-streamline-ultimate-module-three",
  },
  {
    label: "Unified I/O",
    icon: "i-oui-input-output",
  },
  {
    label: "System Calls",
    icon: "i-ix-operating-system-settings",
    defaultOpen: true,
    children: [
      {
        label: "I/O",
        children: [
          {
            label: "Attach",
            icon: "i-iconmind-chapter-outline-thin",
          },
          {
            label: "Change Dir",
            icon: "i-iconmind-chapter-outline-thin",
          },
          {
            label: "Close Path",
            icon: "i-iconmind-chapter-outline-thin",
          },
          {
            label: "Create File",
            icon: "i-iconmind-chapter-outline-thin",
          },
          {
            label: "Delete File",
            icon: "i-iconmind-chapter-outline-thin",
          },
        ],
      },
      {
        label: "User",
        defaultExpanded: true,
        children: [
          {
            label: "Allocate Bits",
            icon: "i-iconmind-chapter-outline-thin",
          },
          {
            label: "Chain",
            icon: "i-iconmind-chapter-outline-thin",
          },
          {
            label: "Compare Names",
            icon: "i-iconmind-chapter-outline-thin",
          },
          {
            label: "CRC",
            icon: "i-iconmind-chapter-outline-thin",
          },
          {
            label: "Deallocate Bits",
            icon: "i-iconmind-chapter-outline-thin",
          },
          {
            label: "Exit",
            icon: "i-iconmind-chapter-outline-thin",
          },
        ],
      },
      {
        label: "System",
        defaultExpanded: true,
        children: [
          {
            label: "Allocate 64",
            icon: "i-iconmind-chapter-outline-thin",
          },
          {
            label: "Find 64",
            icon: "i-iconmind-chapter-outline-thin",
          },
          {
            label: "I/O Delete",
            icon: "i-iconmind-chapter-outline-thin",
          },
          {
            label: "I/O Queue",
            icon: "i-iconmind-chapter-outline-thin",
          },
          {
            label: "Insert Process",
            icon: "i-iconmind-chapter-outline-thin",
          },
          {
            label: "Next Process",
            icon: "i-iconmind-chapter-outline-thin",
          },
        ],
      },
    ],
  },
]
</script>
