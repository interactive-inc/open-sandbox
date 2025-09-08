import { exists } from "node:fs/promises"
import { join } from "node:path"
import type {
  CallToolRequest,
  CallToolResult,
} from "@modelcontextprotocol/sdk/types.js"
import { z } from "zod"

const jsonSchema = z.object({
  type: z.literal("object"),
  properties: z.record(z.string(), z.unknown()).optional(),
  required: z.array(z.string()).optional(),
})

export const zodToJsonSchema = (schema: z.core.$ZodType) => {
  return jsonSchema.parse(z.toJSONSchema(schema))
}

export function createToolFactory<Context extends Record<string, unknown>>() {
  return <
    TSchema extends z.ZodObject,
    TName extends string,
    TDescription extends string,
  >(config: {
    schema: TSchema
    name: TName
    description: TDescription
    handler: (
      input: z.core.output<TSchema>,
      context: Context,
    ) => Promise<CallToolResult>
  }) => {
    const meta = {
      name: config.name,
      description: config.description,
      inputSchema: zodToJsonSchema(config.schema),
    }

    const handler = (request: CallToolRequest, cotext: Context) => {
      const input = config.schema.parse(request.params.arguments)
      return config.handler(input, cotext)
    }

    return Object.freeze({
      meta,
      handler,
    })
  }
}

export async function getDocsPath(...paths: string[]) {
  const patterns = [join(...paths, ".docs"), join(...paths, "docs")]

  for (const pattern of patterns) {
    if (await exists(pattern)) {
      return pattern
    }
  }

  throw new Error("No docs directory found")
}

export function toToolResultContent(
  id: string,
  body: string,
  sections: string[],
): string {
  const parts = [`id: ${id}`, body, ...sections]
  return parts.join("\n\n")
}

export function withHeader(
  directoryId: string,
  fileId: string,
  content: string,
): string {
  return `--- ${directoryId}:${fileId} ---\n\n${content}`
}
