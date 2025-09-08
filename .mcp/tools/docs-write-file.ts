import { z } from "zod"
import { tool } from "../tool"

export const docsWriteFile = tool({
  name: "docs-write-file",
  description: "Write or update a document of the specified type",
  schema: z.object({
    type: z
      .enum(["terms", "repositories", "notes", "issues"])
      .describe("Type of document to write"),
    fileId: z.string().describe("File ID to write or update"),
    markdown: z.string().describe("Markdown content"),
  }),
  async handler(input, context) {
    const directoryRef = context.docClient.directory(input.type)

    const ref = directoryRef.mdFile(input.fileId)

    const exists = await ref.exists()

    if (exists === false) {
      const empty = ref.empty()

      const draftContent = empty.content.withBody(input.markdown)

      const draft = empty.withContent(draftContent)

      await ref.write(draft)

      return { content: [{ type: "text", text: "ok" }] }
    }

    const current = await ref.read()

    if (current instanceof Error) {
      throw current
    }

    const draft = current.withContent(current.content.withBody(input.markdown))

    await ref.write(draft)

    return { content: [{ type: "text", text: "ok" }] }
  },
})
