export function toToolResultContent(
  id: string,
  body: string,
  sections: string[],
): string {
  const parts = [`id: ${id}`, body, ...sections]
  return parts.join("\n\n")
}
