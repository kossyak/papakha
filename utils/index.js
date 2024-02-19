import pako from 'pako'

function compress(str) {
  const compressed = pako.deflate(str, { to: 'string' })
  return compressed
}

function decompress(compressedStr) {
  const decompressed = pako.inflate(compressedStr.split(','), { to: 'string' })
  return decompressed
}
export { compress, decompress }