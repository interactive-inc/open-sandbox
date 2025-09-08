import { z } from "zod"
import { tool } from "../tool"

export const docsDeleteProductFiles = tool({
  name: "docs-delete-product-files",
  description: "Delete multiple features or routes from a specific product",
  schema: z.object({
    productId: z.string().describe("Product ID"),
    type: z
      .enum(["features", "routes", "entities", "notes"])
      .describe("Type of files to delete within the product"),
    fileIds: z
      .array(z.string())
      .describe("Array of IDs to delete (overview is not allowed)"),
  }),
  async handler(input, context) {
    const indexFiles = input.fileIds.indexOf("index")

    if (indexFiles !== -1) {
      throw new Error(
        "Overview files are not allowed. Delete the parent directory instead.",
      )
    }

    const baseDir = context.docClient
      .directory("products")
      .directory(input.productId)
      .directory(input.type)

    for (const fileId of input.fileIds) {
      const ref = baseDir.mdFile(fileId)

      const result = await ref.delete()

      if (result instanceof Error) {
        throw result
      }
    }

    return { content: [{ type: "text", text: "ok" }] }
  },
})
