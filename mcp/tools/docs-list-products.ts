import { z } from "zod"
import { createTool } from "../utils/create-tool"

export const docsListProducts = createTool({
  name: "docs-list-products",
  description:
    "List all products - useful for retrieving product IDs to use with other tools",
  schema: z.object({}),
  async handler(_input, context) {
    const ref = context.docClient.directory("products")

    const directoryRefs = await ref.directories()

    const products = []

    for (const ref of directoryRefs) {
      const index = await ref.indexFile().read()
      if (index instanceof Error) throw index
      products.push({
        id: ref.name,
        title: index.content.title,
        description: index.content.description,
      })
    }

    const text = JSON.stringify(products, null, 2)

    return { content: [{ type: "text" as const, text }] }
  },
})
