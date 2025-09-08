import { z } from "zod"
import { tool } from "../tool"

export const docsCreateRequirement = tool({
  name: "docs-create-requirement",
  description: "Create a new requirement definition",
  schema: z.object({
    requirementSlug: z
      .string()
      .describe("Requirement slug (alphanumeric with hyphens)"),
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

    const now = new Date()

    const y = now.getFullYear()

    const m = String(now.getMonth() + 1).padStart(2, "0")

    const d = String(now.getDate()).padStart(2, "0")

    const fileId = `${y}.${m}.${d}.${input.requirementSlug}`

    const ref = directoryRef.mdFile(fileId)

    const exists = await ref.exists()

    if (exists === true) {
      throw new Error("Issue already exists")
    }

    const draft = ref.empty().withContent((content) => {
      return content.withBody(input.markdown).withMeta((meta) => {
        return meta
          .withProperty("productIds", input.productIds)
          .withProperty("priority", input.priority)
      })
    })

    await ref.write(draft)

    return {
      content: [{ type: "text", text: `ok ${fileId}` }],
    }
  },
})
