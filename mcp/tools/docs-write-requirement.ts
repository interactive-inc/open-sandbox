import { z } from "zod"
import { createTool } from "../utils/create-tool"

export const docsWriteRequirement = createTool({
  name: "docs-write-requirement",
  description: "Write or update a requirement definition",
  schema: z.object({
    requirementId: z.string().describe("Requirement ID to write or update"),
    markdown: z.string().describe("Markdown content"),
    priority: z
      .number()
      .describe("Requirement priority (0: high, 1: medium, 2: low)"),
    productIds: z.string().array().describe("Array of related product IDs"),
  }),
  async handler(input, context) {
    const directoryRef = context.docClient.directory("requirements", {
      productIds: { type: "multi-relation", required: false },
      priority: { type: "number", required: false },
    })

    const ref = directoryRef.mdFile(input.requirementId)

    const exists = await ref.exists()

    if (exists === false) {
      const draft = ref.empty().withContent((content) => {
        return content.withBody(input.markdown).withMeta((meta) => {
          return meta
            .withProperty("productIds", input.productIds)
            .withProperty("priority", input.priority)
        })
      })

      await ref.write(draft)

      return { content: [{ type: "text" as const, text: "ok" }] }
    }

    const current = await ref.read()

    if (current instanceof Error) {
      throw current
    }

    const draft = current.withContent((content) => {
      return content.withBody(input.markdown).withMeta((meta) => {
        return meta
          .withProperty("productIds", input.productIds)
          .withProperty("priority", input.priority)
      })
    })

    await ref.write(draft)

    return { content: [{ type: "text" as const, text: "ok" }] }
  },
})
