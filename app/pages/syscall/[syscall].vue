<template>
  <div v-if="system_call">
    <div class="text-2xl">ASSEMBLER CALL : OS9 {{ fname }}</div>
    <div class="text-2xl">MACHINE CODE: 103F {{ system_call.code.toString(16).toUpperCase() }}</div>
    <div class="test-2xl">
      INPUT:
      <template v-if="system_call.entry" v-for="input in system_call.entry">
        {{ input }}
      </template>
      <template v-else> None </template>
    </div>
    <div class="text-sm">
      <p v-html="description"></p>
    </div>
  </div>
</template>

<script setup>
const store = useSyscallStore()
const route = useRoute()
// const syscall = computed(() => store.getSystemCall(route.params.syscall))
const fcode = computed(() =>
  store.system_call ? FormSyscallCode(store.system_call.code) : '-- -- --',
)
const fname = computed(() => (store.system_call ? store.system_call.function : 'undefined'))
const description = computed(() =>
  store.system_call ? store.system_call.description : 'DESCRIPTION',
)
const system_call = ref(null)

onMounted(() => {
  store.getSystemCall(route.params.syscall)
  system_call.value = store.system_call
})
</script>

<style scoped></style>
