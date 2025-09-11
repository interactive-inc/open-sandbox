import { z } from "zod"
import { withHeader } from "../lib"
import { tool } from "../tool"
import type { CallToolResultContent } from "../types"

export const docsReadProductFiles = tool({
  name: "docs-read-product-files",
  description: "Read multiple files from a specific product directory",
  schema: z.object({
    productId: z.string().describe("Product ID"),
    type: z
      .enum(["features", "entities", "notes"])
      .describe("Type of files to read within the product"),
    fileIds: z.array(z.string()).describe("Array of file IDs to read"),
  }),
  async handler(input, context) {
    const results: CallToolResultContent[] = []

    const directoryRef = context.docClient
      .directory("products")
      .directory(input.productId)
      .directory(input.type)

    for (const fileId of input.fileIds) {
      const ref = directoryRef.mdFile(fileId)
      const file = await ref.read()
      if (file instanceof Error) {
        throw file
      }
      results.push({
        type: "text",
        text: withHeader(input.type, fileId, file.content.body),
      })
    }

    return {
      content: results,
    }
  },
})
