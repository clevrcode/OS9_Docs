<template>
  <div>
    <UFooter>
      <template #left>
        <p class="text-sm text-muted">Built with Nuxt UI • © {{ new Date().getFullYear() }}</p>
      </template>

      <template #right>
        <UButton
          to="https://github.com/clevrcode/OS9_Docs.git"
          target="_blank"
          icon="i-simple-icons-github"
          aria-label="GitHub"
          color="neutral"
          variant="ghost"
        />
      </template>
    </UFooter>
  </div>
</template>

<script setup></script>

<style scoped></style>
