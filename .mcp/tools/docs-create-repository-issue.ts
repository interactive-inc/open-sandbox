import { z } from "zod"
import { tool } from "../tool"

export const docsCreateRepositoryIssue = tool({
  name: "docs-create-repository-issue",
  description: "Create a new issue in a repository",
  schema: z.object({
    repositoryId: z.string().describe("Repository ID"),
    issueSlug: z.string().describe("Issue slug (alphanumeric with hyphens)"),
    markdown: z.string().describe("Markdown content"),
    requirementId: z.string().nullable().describe("Related requirement ID"),
  }),
  async handler(input, context) {
    const directoryRef = context.docClient.directory("issues", {
      requirementId: { type: "relation", required: false },
      repositoryId: { type: "relation", required: false },
    })

    const now = new Date()

    const y = now.getFullYear()

    const m = String(now.getMonth() + 1).padStart(2, "0")

    const d = String(now.getDate()).padStart(2, "0")

    const fileId = `${y}.${m}.${d}.${input.issueSlug}`

    const ref = directoryRef.mdFile(fileId)

    const exists = await ref.exists()

    if (exists === true) {
      throw new Error("Issue already exists")
    }

    const draft = ref.empty().withContent((content) => {
      return content.withBody(input.markdown).withMeta((meta) => {
        return meta
          .withProperty("repositoryId", input.repositoryId)
          .withProperty("requirementId", input.requirementId ?? "")
      })
    })

    await ref.write(draft)

    return {
      content: [{ type: "text", text: "ok" }],
    }
  },
})
