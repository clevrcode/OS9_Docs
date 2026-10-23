export default function (code: number): string {
  let opcode = Number(code) % 256
  return opcode.toString(16).toUpperCase()
}
