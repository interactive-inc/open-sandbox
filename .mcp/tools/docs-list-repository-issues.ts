import { z } from "zod"
import { tool } from "../tool"

export const docsListRepositoryIssues = tool({
  name: "docs-list-repository-issues",
  description:
    "List issues for a specific repository - useful for retrieving IDs to use with other tools",
  schema: z.object({
    repositoryId: z.string().describe("Repository ID"),
  }),
  async handler(input, context) {
    const directoryRef = context.docClient.directory("issues", {
      repositoryId: { type: "relation", required: true },
    })

    const files = await directoryRef.readMdFiles()

    if (files instanceof Error) {
      throw files
    }

    const productFiles = files.filter((file) => {
      return file.content.meta().field("repositoryId") === input.repositoryId
    })

    const pages = productFiles.map((file) => {
      return {
        id: file.path.name,
        title: file.content.title,
        description: file.content.description,
      }
    })

    const text = JSON.stringify(pages, null, 2)

    return {
      content: [{ type: "text", text: text }],
    }
  },
})
