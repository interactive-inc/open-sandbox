import { z } from "zod"
import { withHeader } from "../lib"
import { tool } from "../tool"

export const docsReadProductOverview = tool({
  name: "docs-read-product-overview",
  description: "Read overview from a product subdirectory",
  schema: z.object({
    productId: z.string().describe("Product ID"),
    type: z.enum(["features", "routes"]).describe("Type of overview to read"),
  }),
  async handler(input, context) {
    const ref = context.docClient
      .directory("products")
      .directory(input.productId)
      .directory(input.type)
      .indexFile()

    const file = await ref.read()

    if (file instanceof Error) {
      throw file
    }

    const text = withHeader(input.type, "overview", file.content.body)

    return { content: [{ type: "text" as const, text }] }
  },
})
