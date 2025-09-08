import { z } from "zod"
import { tool } from "../tool"

export const docsListProductFiles = tool({
  name: "docs-list-product-files",
  description:
    "List features or routes from a specific product - useful for retrieving IDs to use with other tools",
  schema: z.object({
    productId: z.string().describe("Product ID"),
    type: z
      .enum(["features", "routes", "entities", "notes"])
      .describe("Type of files to list within the product"),
  }),
  async handler(input, context) {
    const ref = context.docClient
      .directory("products")
      .directory(input.productId)
      .directory(input.type)

    const files = await ref.readMdFiles()

    const pages = files.map((file) => ({
      id: file.path.name,
      title: file.content.title,
      description: file.content.description,
    }))

    const text = JSON.stringify(pages, null, 2)

    return { content: [{ type: "text", text: text }] }
  },
})
