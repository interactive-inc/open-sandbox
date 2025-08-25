export function withHeader(
  directoryId: string,
  fileId: string,
  content: string,
): string {
  return `--- ${directoryId}:${fileId} ---\n\n${content}`
}
