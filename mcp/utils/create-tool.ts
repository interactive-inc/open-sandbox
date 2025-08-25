import type { ToolProps } from "../types"
import { createToolFactory } from "../utils/create-tool-factory"

export const createTool = createToolFactory<ToolProps>()
