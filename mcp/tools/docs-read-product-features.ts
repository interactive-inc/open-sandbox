import { z } from "zod"
import { createTool } from "../utils/create-tool"
import { withHeader } from "../utils/with-header"

export const docsReadProductFeatures = createTool({
  name: "docs-read-product-features",
  description: "Read multiple features from a specific product",
  schema: z.object({
    productId: z.string().describe("Product ID"),
    fileIds: z.array(z.string()).describe("Array of feature IDs to read"),
  }),
  async handler(input, context) {
    const baseDir = context.docClient
      .directory("products")
      .directory(input.productId)
      .directory("features")

    const results = []

    for (const fileId of input.fileIds) {
      const ref = baseDir.mdFile(fileId)
      const file = await ref.read()
      if (file instanceof Error) {
        throw file
      }
      results.push({
        type: "text" as const,
        text: withHeader("features", fileId, file.content.body),
      })
    }

    return {
      content: results,
    }
  },
})
