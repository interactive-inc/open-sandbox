import { DocClient, DocFileSystem } from "@interactive-inc/docs-client"
import { Server } from "@modelcontextprotocol/sdk/server/index.js"
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js"
import {
  CallToolRequestSchema,
  ListToolsRequestSchema,
} from "@modelcontextprotocol/sdk/types.js"
import { getDocsPath } from "./lib"
import { docsCreateProduct } from "./tools/docs-create-product"
import { docsCreateRepositoryIssue } from "./tools/docs-create-repository-issue"
import { docsCreateRequirement } from "./tools/docs-create-requirement"
import { docsDeleteFiles } from "./tools/docs-delete-files"
import { docsDeleteProduct } from "./tools/docs-delete-product"
import { docsDeleteProductFiles } from "./tools/docs-delete-product-files"
import { docsListFiles } from "./tools/docs-list-files"
import { docsListProductFiles } from "./tools/docs-list-product-files"
import { docsListProducts } from "./tools/docs-list-products"
import { docsListRepositoryIssues } from "./tools/docs-list-repository-issues"
import { docsReadFiles } from "./tools/docs-read-files"
import { docsReadOverview } from "./tools/docs-read-overview"
import { docsReadProductFiles } from "./tools/docs-read-product-files"
import { docsReadProductOverview } from "./tools/docs-read-product-overview"
import { docsReadProductRoutes } from "./tools/docs-read-product-routes"
import { docsWriteFile } from "./tools/docs-write-file"
import { docsWriteOverview } from "./tools/docs-write-overview"
import { docsWriteProductFile } from "./tools/docs-write-product-file"
import { docsWriteProductOverview } from "./tools/docs-write-product-overview"
import { docsWriteProductRoute } from "./tools/docs-write-product-route"
import { docsWriteRequirement } from "./tools/docs-write-requirement"

export const server = new Server(
  { name: "local", version: "0.1.0" },
  { capabilities: { tools: {} } },
)

const tools = [
  // Create
  docsCreateProduct,
  docsCreateRepositoryIssue,
  docsCreateRequirement,
  // Delete
  docsDeleteFiles,
  docsDeleteProduct,
  docsDeleteProductFiles,
  // List
  docsListFiles,
  docsListProducts,
  docsListProductFiles,
  docsListRepositoryIssues,
  // Read
  docsReadFiles,
  docsReadOverview,
  docsReadProductFiles,
  docsReadProductRoutes,
  docsReadProductOverview,
  // Write
  docsWriteFile,
  docsWriteOverview,
  docsWriteProductFile,
  docsWriteProductOverview,
  docsWriteProductRoute,
  docsWriteRequirement,
]

const docsPath = await getDocsPath(__dirname, "..")

const docClient = new DocClient({
  fileSystem: new DocFileSystem({ basePath: docsPath }),
})

server.setRequestHandler(ListToolsRequestSchema, () => {
  return {
    tools: tools.map((tool) => tool.meta),
  }
})

server.setRequestHandler(CallToolRequestSchema, (request) => {
  const tool = tools.find((tool) => tool.meta.name === request.params.name)

  if (tool === undefined) {
    throw new Error(`Unknown tool: ${request.params.name}`)
  }

  return tool.handler(request, { docClient })
})

const transport = new StdioServerTransport()

await server.connect(transport)
