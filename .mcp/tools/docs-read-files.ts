import { z } from "zod"
import { withHeader } from "../lib"
import { tool } from "../tool"
import type { CallToolResultContent } from "../types"

export const docsReadFiles = tool({
  name: "docs-read-files",
  description: "Read multiple documents of a specific type",
  schema: z.object({
    type: z
      .enum(["repositories", "requirements", "terms", "issues", "notes"])
      .describe("Type of documents to read"),
    fileIds: z.array(z.string()).describe("Array of IDs to read"),
  }),
  async handler(input, context) {
    const directoryRef = context.docClient.directory(input.type)

    const results: CallToolResultContent[] = []

    for (const fileId of input.fileIds) {
      const ref = directoryRef.mdFile(fileId)

      const file = await ref.read()

      if (file instanceof Error) {
        throw file
      }

      results.push({
        type: "text" as const,
        text: withHeader(input.type, fileId, file.content.body),
      })
    }

    return { content: results }
  },
})
