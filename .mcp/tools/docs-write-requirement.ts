import { z } from "zod"
import { tool } from "../tool"

export const docsWriteRequirement = tool({
  name: "docs-write-requirement",
  description: "Write or update a requirement definition",
  schema: z.object({
    requirementId: z.string().describe("Requirement ID to write or update"),
    markdown: z.string().describe("Markdown content"),
    priority: z
      .number()
      .describe("Requirement priority (0: high, 1: medium, 2: low)"),
    productIds: z.string().array().describe("Array of related product IDs"),
    repositoryIds: z
      .string()
      .array()
      .describe("Array of related repository IDs"),
  }),
  async handler(input, context) {
    const directoryRef = context.docClient.directory("requirements", {
      priority: { type: "number", required: false },
      productIds: { type: "multi-relation", required: false },
      repositoryIds: { type: "multi-relation", required: false },
    })

    const ref = directoryRef.mdFile(input.requirementId)

    const exists = await ref.exists()

    if (exists === false) {
      const draft = ref.empty().withContent((content) => {
        return content.withBody(input.markdown).withMeta((meta) => {
          return meta
            .withProperty("priority", input.priority)
            .withProperty("productIds", input.productIds)
            .withProperty("repositoryIds", input.repositoryIds)
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
          .withProperty("priority", input.priority)
          .withProperty("productIds", input.productIds)
          .withProperty("repositoryIds", input.repositoryIds)
      })
    })

    await ref.write(draft)

    return { content: [{ type: "text" as const, text: "ok" }] }
  },
})
