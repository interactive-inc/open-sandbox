import { z } from "zod"

const jsonSchema = z.object({
  type: z.literal("object"),
  properties: z.record(z.string(), z.unknown()).optional(),
  required: z.array(z.string()).optional(),
})

export const zodToJsonSchema = (schema: z.core.$ZodType) => {
  return jsonSchema.parse(z.toJSONSchema(schema))
}
