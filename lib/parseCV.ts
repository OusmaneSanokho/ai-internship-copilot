export async function extractTextFromPDF(file: File): Promise<string> {
  const arrayBuffer = await file.arrayBuffer()
  const uint8Array = new Uint8Array(arrayBuffer)
  let text = ''
  const decoder = new TextDecoder('utf-8', { fatal: false })
  text = decoder.decode(uint8Array)
  const cleanText = text
    .replace(/[^\x20-\x7E\n\r\t]/g, ' ')
    .replace(/\s+/g, ' ')
    .trim()
  return cleanText
}