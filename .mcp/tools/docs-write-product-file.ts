import { z } from "zod"
import { tool } from "../tool"

export const docsWriteProductFile = tool({
  name: "docs-write-product-feature",
  description: "Write or update a product feature",
  schema: z.object({
    productId: z.string().describe("Product ID"),
    type: z
      .enum(["features", "entities", "notes"])
      .describe("Type of document to write"),
    fileId: z.string().describe("File ID to write or update"),
    markdown: z.string().describe("Markdown content"),
  }),
  async handler(input, context) {
    const featuresRef = context.docClient
      .directory("products")
      .directory(input.productId)
      .directory(input.type)

    const ref = featuresRef.mdFile(input.fileId)

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
