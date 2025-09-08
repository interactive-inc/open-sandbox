import { z } from "zod"
import { tool } from "../tool"

export const docsCreateProduct = tool({
  name: "docs-create-product",
  description: "Create a new product with its directory structure",
  schema: z.object({
    productId: z.string().describe("Product ID (alphanumeric with hyphens)"),
    productName: z.string().describe("Product display name"),
    markdown: z.string().describe("Markdown content for product overview"),
  }),
  async handler(input, context) {
    const productsRef = context.docClient.directory("products")

    // Create product directory
    const productRef = productsRef.directory(input.productId)

    // Create product index file with overview
    const indexRef = productRef.indexFile()
    const indexExists = await indexRef.exists()

    if (indexExists === true) {
      throw new Error(`Product '${input.productId}' already exists`)
    }

    // Create product overview
    const emptyIndex = indexRef.empty()
    const draftIndexContent = emptyIndex.content.withBody(input.markdown)
    const draftIndex = emptyIndex.withContent(draftIndexContent)
    await indexRef.write(draftIndex)

    // Create features directory with empty overview
    const featuresRef = productRef.directory("features")
    const featuresIndexRef = featuresRef.indexFile()
    const emptyFeaturesIndex = featuresIndexRef.empty()
    const featuresDraftContent = emptyFeaturesIndex.content.withBody(
      `# ${input.productName} Features\n\nFeatures for ${input.productName} will be documented here.`,
    )
    const featuresDraft = emptyFeaturesIndex.withContent(featuresDraftContent)
    await featuresIndexRef.write(featuresDraft)

    // Create routes directory with empty overview
    const routesRef = productRef.directory("routes")
    const routesIndexRef = routesRef.indexFile()
    const emptyRoutesIndex = routesIndexRef.empty()
    const routesDraftContent = emptyRoutesIndex.content.withBody(
      `# ${input.productName} Routes\n\nRoutes and navigation for ${input.productName} will be documented here.`,
    )
    const routesDraft = emptyRoutesIndex.withContent(routesDraftContent)
    await routesIndexRef.write(routesDraft)

    return { content: [{ type: "text", text: "ok" }] }
  },
})
