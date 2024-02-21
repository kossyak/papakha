import pako from 'pako'

function compress(str) {
  const compressed = pako.deflate(str, { to: 'string' })
  return btoa(compressed.reduce((data, byte) => data + String.fromCharCode(byte), ''))
}
function decompress(compressedStr) {
  return pako.inflate(atob(compressedStr).split('').map(char => char.charCodeAt(0)), { to: 'string' })
}
export { compress, decompress }