<template>
  <div v-if="loaded">
    <!-- <div class="flex flex-wrap flex-row content-between"> -->
    <div class="syscall-page">
      <div class="syscall-header">
        <div class="text-3xl p-4">
          {{ fname }}
        </div>
        <div class="text-3xl p-4">
          {{ title }}
        </div>
        <div class="text-3xl p-4">
          {{ fcall }}
        </div>
      </div>
      <div class="syscall-content">
        <div class="text-2xl">Assembler Call : OS9 {{ fcall }}</div>
        <div class="text-2xl">Machine Code : {{ fcode }}</div>
        <div class="text-2xl">
          INPUT:
          <div v-for="input in entries">
            <div class="reg-values pl-4">{{ input.name }} : {{ input.description }}</div>
          </div>
        </div>
        <div class="text-2xl">
          OUTPUT:
          <div v-for="output in exit_success">
            <div class="reg-values pl-4">{{ output.name }} : {{ output.description }}</div>
          </div>
        </div>
        <div class="text-2xl">
          ON ERROR:
          <div v-for="output in exit_error">
            <div class="reg-values pl-4">{{ output.name }} : {{ output.description }}</div>
          </div>
        </div>
        <div class="text-base">
          <p v-html="description"></p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
const store = useSyscallStore()
const route = useRoute()

const fname = computed(() => store.system_call.name)
const title = computed(() => store.system_call.title)
const fcode = computed(() => {
  return '103F ' + FormSyscallCode(store.system_call.code, 16)
})
const fcall = computed(() => (store.system_call ? store.system_call.function : 'undefined'))
const description = computed(() =>
  store.system_call ? store.system_call.description : 'DESCRIPTION MISSING',
)
const entries = computed(() => (store.system_call ? store.system_call.entry : []))
const exit_success = computed(() => (store.system_call ? store.system_call.exit_success : []))
const exit_error = computed(() => (store.system_call ? store.system_call.exit_error : []))

const loaded = ref(false)

onMounted(() => {
  store.getSystemCall(route.params.syscall)
  loaded.value = true
})
</script>

<style scoped>
.syscall-page {
  display: flex;
  flex-direction: column;
}

.syscall-header {
  display: flex;
  justify-content: space-between;
  padding: 20px 10px;
}

.syscall-content {
  padding-left: 20px;
}
</style>
