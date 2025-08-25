import { z } from "zod"
import { createTool } from "../utils/create-tool"
import { toToolResultContent } from "../utils/to-tool-result-content"
import { withHeader } from "../utils/with-header"

export const docsReadProductRoutes = createTool({
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

    const results = []

    for (const fileId of input.fileIds) {
      const ref = directoryRef.mdFile(fileId)

      const file = await ref.read()

      if (file instanceof Error) {
        throw file
      }

      const featureRefs = await ref.relations("features")

      const features = []

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
        type: "text" as const,
        text: withHeader("routes", fileId, pageContent),
      })
    }

    return { content: results }
  },
})
