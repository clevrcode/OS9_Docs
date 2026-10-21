export default function (code: number): string {
  let opcode = Number(code) % 256
  return 'OS9 $' + opcode.toString(16).toUpperCase()
}
