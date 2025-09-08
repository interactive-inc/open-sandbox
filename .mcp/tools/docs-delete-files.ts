import { z } from "zod"
import { tool } from "../tool"

export const docsDeleteFiles = tool({
  name: "docs-delete-files",
  description: "Delete multiple documents of a specific type",
  schema: z.object({
    type: z
      .enum(["repositories", "requirements", "terms", "issues", "notes"])
      .describe("Type of documents to delete"),
    fileIds: z
      .array(z.string())
      .describe("Array of IDs to delete (overview cannot be deleted)"),
  }),
  async handler(input, context) {
    const indexFiles = input.fileIds.indexOf("index")

    if (indexFiles !== -1) {
      throw new Error("Overview files cannot be deleted")
    }

    const directoryRef = context.docClient.directory(input.type)

    for (const fileId of input.fileIds) {
      const ref = directoryRef.mdFile(fileId)

      const result = await ref.delete()

      if (result instanceof Error) {
        throw result
      }
    }

    return { content: [{ type: "text", text: "ok" }] }
  },
})
