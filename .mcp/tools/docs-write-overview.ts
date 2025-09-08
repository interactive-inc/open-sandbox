import { z } from "zod"
import { tool } from "../tool"

export const docsWriteOverview = tool({
  name: "docs-write-overview",
  description: "Write or update overview for specific type",
  schema: z.object({
    type: z
      .enum(["project", "products", "repositories"])
      .describe(
        "Type of overview to write (project for overall project overview)",
      ),
    markdown: z.string().describe("Markdown content for the overview"),
  }),
  async handler(input, context) {
    const directoryPath = input.type === "project" ? "" : input.type

    const ref = context.docClient.directory(directoryPath).indexFile()

    const exists = await ref.exists()

    if (exists === false) {
      const empty = ref.empty()

      const draftContent = empty.content.withBody(input.markdown)

      const draft = empty.withContent(draftContent)

      await ref.write(draft)

      return { content: [{ type: "text" as const, text: "ok" }] }
    }

    const current = await ref.read()

    if (current instanceof Error) {
      throw current
    }

    const draft = current.withContent(current.content.withBody(input.markdown))

    await ref.write(draft)

    return { content: [{ type: "text" as const, text: "ok" }] }
  },
})
