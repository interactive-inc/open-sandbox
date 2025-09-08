import { z } from "zod"
import { withHeader } from "../lib"
import { tool } from "../tool"

export const docsReadOverview = tool({
  name: "docs-read-overview",
  description: "Read overview from project or specific type",
  schema: z.object({
    type: z
      .enum(["project", "products", "repositories"])
      .describe(
        "Type of overview to read (project for overall project overview)",
      ),
  }),
  async handler(input, context) {
    const directoryPath = input.type === "project" ? "" : input.type

    const ref = context.docClient.directory(directoryPath).indexFile()

    const file = await ref.read()

    if (file instanceof Error) {
      throw file
    }

    const text = withHeader(input.type, "overview", file.content.body)

    return { content: [{ type: "text" as const, text }] }
  },
})
