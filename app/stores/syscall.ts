// This is required for Nuxt 4.6.1 (until 4.6.2)
// NOT FIXED WITH 4.6.2
// Add this explicit import at the top of your file:
import { $fetch } from '#build/fetch'
interface Register {
  name: string
  description: string
}

interface Errors {
  level: string
  errcode: string[]
}

interface SystemCall {
  name: string
  title: string
  code: number
  function: string
  entry: Register[]
  exit_success: Register[]
  exit_error: Register[]
  level: number[]
  location: string
  system: boolean
  description: string[]
  errors: Errors[]
}

interface SyscallList {
  function: string
  code: number
}

export const useSyscallStore = defineStore('syscall', () => {
  // const system_call = ref<SystemCall | null>(null)
  const system_call = ref<SystemCall>({
    name: '',
    title: '',
    code: 0,
    function: '',
    entry: [],
    exit_success: [],
    exit_error: [],
    level: [],
    location: '',
    system: false,
    description: [],
    errors: [],
  })

  const syscall_list = ref<SyscallList[]>([])

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

  async function getIOSystemCall() {
    try {
      const url = `${useRuntimeConfig().public.api_url}/list/IOsyscall` as string
      const response = (await $fetch(url, {
        headers: { 'X-Requested-With': 'XMLHttpRequest' },
      })) as SyscallList[]
      if (response) {
        console.log(response)
        syscall_list.value = response
      }
    } catch (error) {
      syscall_list.value = []
      console.log('fetch syscall error')
      console.log(error)
      throw error
    }
  }

  return {
    syscall_list,
    system_call,
    getIOSystemCall,
    getSystemCall,
  }
})
