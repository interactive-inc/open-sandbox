import { z } from "zod"
import { tool } from "../tool"

export const docsWriteProductOverview = tool({
  name: "docs-write-product-overview",
  description: "Write or update overview in a product subdirectory",
  schema: z.object({
    productId: z.string().describe("Product ID"),
    type: z
      .enum(["features", "routes"])
      .describe("Type of overview to write within the product"),
    markdown: z.string().describe("Markdown content for the overview"),
  }),
  async handler(input, context) {
    const ref = context.docClient
      .directory("products")
      .directory(input.productId)
      .directory(input.type)
      .indexFile()

    const exists = await ref.exists()

    if (exists === false) {
      const empty = ref.empty()

      const draftContent = empty.content.withBody(input.markdown)

      const draft = empty.withContent(draftContent)

      await ref.write(draft)

      return { content: [{ type: "text" as const, text: "ok" }] }
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
