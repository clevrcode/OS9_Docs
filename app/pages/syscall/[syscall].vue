<template>
  <div v-if="loaded">
    <!-- <div class="flex flex-wrap flex-row content-between"> -->
    <div class="flex-col absolute font-mono space-y-10">
      <div class="flex justify-between bg-accented sticky top-0">
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
      <div class="m-5 pl-5 space-y-10 overflow-y-scroll">
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
        <div class="text-2xl list-none pb-12.5">
          <div v-for="line in description">
            <p v-html="line" class="py-2.5"></p>
          </div>
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

<style scoped></style>
