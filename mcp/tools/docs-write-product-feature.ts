import { z } from "zod"
import { createTool } from "../utils/create-tool"

export const docsWriteProductFeature = createTool({
  name: "docs-write-product-feature",
  description: "Write or update a product feature",
  schema: z.object({
    productId: z.string().describe("Product ID"),
    featureId: z.string().describe("Feature ID to write or update"),
    markdown: z.string().describe("Markdown content"),
  }),
  async handler(input, context) {
    const featuresRef = context.docClient
      .directory("products")
      .directory(input.productId)
      .directory("features")

    const ref = featuresRef.mdFile(input.featureId)

    const exists = await ref.exists()

    if (exists === false) {
      const empty = ref.empty()

      const draftContent = empty.content.withBody(input.markdown)

      const draft = empty.withContent(draftContent)

      await ref.write(draft)

      return { content: [{ type: "text", text: "ok" }] }
    }

    const current = await ref.read()

    if (current instanceof Error) {
      throw current
    }

    const draft = current.withContent(current.content.withBody(input.markdown))

    await ref.write(draft)

    return { content: [{ type: "text", text: "ok" }] }
  },
})
