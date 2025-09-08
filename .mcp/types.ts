import type { DocClient } from "@interactive-inc/docs-client"

export type ToolProps = {
  // productId: string
  docClient: DocClient
}

export type CallToolResultContent = {
  type: "text"
  text: string
}
