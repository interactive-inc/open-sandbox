import type {
  CallToolRequest,
  CallToolResult,
} from "@modelcontextprotocol/sdk/types.js"
import type { z } from "zod"
import { zodToJsonSchema } from "./zod-to-json-schema"

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
