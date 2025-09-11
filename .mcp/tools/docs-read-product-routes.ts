import { z } from "zod"
import { toToolResultContent, withHeader } from "../lib"
import { tool } from "../tool"
import type { CallToolResultContent } from "../types"

export const docsReadProductRoutes = tool({
  name: "docs-read-product-routes",
  description: "Read multiple routes from a specific product",
  schema: z.object({
    productId: z.string().describe("Product ID"),
    fileIds: z.array(z.string()).describe("Array of route IDs to read"),
  }),
  async handler(input, context) {
    const directoryRef = context.docClient
      .directory("products")
      .directory(input.productId)
      .directory("routes", {
        features: { type: "multi-relation", required: false },
      })

    const results: CallToolResultContent[] = []

    for (const fileId of input.fileIds) {
      const ref = directoryRef.mdFile(fileId)

      const file = await ref.read()

      if (file instanceof Error) {
        throw file
      }

      const featureRefs = await ref.relations("features")

      const features: string[] = []

      for (const featureRef of featureRefs) {
        const result = await featureRef.read()
        if (result instanceof Error) continue
        features.push(
          withHeader("features", result.path.name, result.content.body),
        )
      }

      const pageContent = toToolResultContent(
        file.path.name,
        file.content.body,
        features,
      )

      results.push({
        type: "text",
        text: withHeader("routes", fileId, pageContent),
      })
    }

    return { content: results }
  },
})
