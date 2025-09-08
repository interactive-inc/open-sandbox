import { rm } from "node:fs/promises"
import { z } from "zod"
import { tool } from "../tool"

export const docsDeleteProduct = tool({
  name: "docs-delete-product",
  description: "Delete a product and all its contents (features, routes, etc.)",
  schema: z.object({
    productId: z.string().describe("Product ID to delete"),
  }),
  async handler(input, context) {
    const productsRef = context.docClient.directory("products")

    const productRef = productsRef.directory(input.productId)

    await rm(productRef.fullPath, { recursive: true, force: true })

    return { content: [{ type: "text" as const, text: "ok" }] }
  },
})
