// This is required for Nuxt 4.6.1 (until 4.6.2)
// Add this explicit import at the top of your file:
import { $fetch } from '#build/fetch'
interface Register {
  name: string
  description: string
}
interface SystemCall {
  function: string
  code: number
  entry: Register[]
  exit_success: Register[]
  exit_error: Register[]
  level: number[]
  system: boolean
  description: string
}

export const useSyscallStore = defineStore('syscall', () => {
  const system_call = ref<SystemCall>({
    function: '',
    code: 0,
    entry: [],
    exit_success: [],
    exit_error: [],
    level: [],
    system: false,
    description: '',
  })

  async function getSystemCall(opcode: number) {
    console.log(`>>> getSystemCall( ${opcode} )`)
    console.log(`current ${system_call.value?.function}`)

    try {
      const url = `${useRuntimeConfig().public.api_url}/syscall/${opcode}` as string
      const response = (await $fetch(url, {
        headers: { 'X-Requested-With': 'XMLHttpRequest' },
      })) as SystemCall
      console.log(url)
      if (response) {
        system_call.value = response
      }
    } catch (error) {
      console.log('fetch syscall error')
      console.log(error)
      throw error
    }
    console.log('<<< getSystemCall')
  }

  return {
    system_call,
    getSystemCall,
  }
})
