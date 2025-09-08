import { z } from "zod"
import { tool } from "../tool"

export const docsListFiles = tool({
  name: "docs-list-files",
  description:
    "List documents of a specific type - useful for retrieving IDs to use with other tools",
  schema: z.object({
    type: z
      .enum(["repositories", "requirements", "terms", "issues", "notes"])
      .describe("Type of documents to list"),
  }),
  async handler(input, context) {
    const ref = context.docClient.directory(input.type)

    const files = await ref.readMdFiles()

    const pages = files.map((file) => {
      return {
        id: file.path.name,
        title: file.content.title,
        description: file.content.description,
      }
    })

    const pagesText = JSON.stringify(pages, null, 2)

    return {
      content: [{ type: "text", text: pagesText }],
    }
  },
})
