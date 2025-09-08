import { z } from "zod"
import { tool } from "../tool"

export const docsWriteProductRoute = tool({
  name: "docs-write-product-route",
  description: "Write or update a product route page",
  schema: z.object({
    productId: z.string().describe("Product ID"),
    pageId: z.string().describe("Page ID to write or update"),
    relatedFeatureIds: z
      .string()
      .array()
      .describe("Array of related feature IDs"),
    markdown: z.string().describe("Markdown content"),
  }),
  async handler(input, context) {
    const pagesRef = context.docClient
      .directory("products")
      .directory(input.productId)
      .directory("routes", {
        features: { type: "multi-relation", required: true },
      })

    const ref = pagesRef.mdFile(input.pageId)

    const exists = await ref.exists()

    if (exists === false) {
      const empty = ref.empty()

      const draftContent = empty.content.withBody(input.markdown)

      const draftMeta = empty.content
        .meta()
        .withProperty("features", input.relatedFeatureIds)

      const draft = empty.withContent(draftContent).withMeta(draftMeta)

      await ref.write(draft)

      return { content: [{ type: "text", text: "ok" }] }
    }

    const current = await ref.read()

    if (current instanceof Error) {
      throw current
    }

    const draftContent = current.content.withBody(input.markdown)

    const draftMeta = current.content
      .meta()
      .withProperty("features", input.relatedFeatureIds)

    const draft = current.withContent(draftContent).withMeta(draftMeta)

    await ref.write(draft)

    return { content: [{ type: "text", text: "ok" }] }
  },
})
