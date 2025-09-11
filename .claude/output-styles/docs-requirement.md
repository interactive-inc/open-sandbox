---
name: docs-requirement
description: Create requirements from user requests
---

# Requirement Creation Mode

Extends `docs` output-style. Creates requirements while updating existing specs through dialogue.

INHERIT: docs.md (read first for base behavior)

SPECIFIC_PURPOSE:
- Transform user requests into formal requirements
- Link requirements to existing specs
- Update related specs as needed

WORKFLOW:
1. **Identify Products** → mcp__local__docs-list-products → identify related
2. **Check Existing Requirements** → mcp__local__docs-list-files(type: "requirements")
3. **Confirm Scope** → "Is this for [product X]?"
4. **Gather Details** → One question at a time
5. **Draft Requirement** → Show proposed format with priority and productIds
6. **Create & Link** → mcp__local__docs-create-requirement with proper parameters

INFORMATION_GATHERING:
Ask incrementally about:
- Current state (read from existing specs first)
- Desired change (specific success criteria)
- Reason/motivation (for Context section)
- Impact scope (which products/features affected)
- Priority (0=high, 1=medium, 2=low)
- Timeline needs (if any)
- Related existing requirements (check for duplicates)

AUTO_GENERATE:
- Requirement ID: YYYY.MM.DD.descriptive-slug
- Link to products via productIds array
- Set priority based on user input

REQUIREMENT_FORMAT:
```markdown
# [Requirement Title]

[Brief overview 1-2 sentences]

## Details

[Detailed description of the requirement]

## Acceptance Criteria

- [Specific measurable condition 1]
- [Specific measurable condition 2]
- [Specific measurable condition 3]

## Context (Optional)

[Background or reasoning for this requirement]

## Note A (Optional)

[Additional information as needed]
```

MCP_PARAMETERS:
- `requirementSlug`: alphanumeric-hyphen format (auto-generated: YYYY.MM.DD.slug)
- `markdown`: Content in requirement format
- `priority`: 0 (high) / 1 (medium) / 2 (low) - confirmed with user
- `productIds`: Array from identified products

FILE_NAMING:
- Auto-generate with date prefix: `2025.01.24.search-improvement`
- Ensures chronological ordering
- Slug describes the requirement topic

DIALOGUE_EXAMPLE:
```
User: Need better search functionality
AI: Let me check current search specs...
*uses mcp__local__docs-list-files and mcp__local__docs-read-product-features*
AI: Found existing search in product-X. Is this the right product?
User: Yes
AI: Current search uses basic text matching. What specific improvements do you need?
User: Fuzzy search and filters
AI: Should this support typo tolerance?
User: Yes
AI: Priority - is this high/medium/low?
User: High
AI: Here's the requirement draft:
   - File: 2025.01.24.search-improvement
   - Priority: 0 (high)
   - Products: ["product-x"]
   [shows full markdown]
AI: Shall I create this requirement?
User: Yes
*uses mcp__local__docs-create-requirement*
AI: Created! Should I also document the decision rationale in notes?
```

CONSISTENCY_CHECK:
- After creating requirement, check for spec updates needed
- Propose feature/route updates if applicable
- Maintain spec-requirement linkage via productIds
- Document major decisions in notes: `mcp__local__docs-write-file(type: "notes")`
- Track technical debt if requirement creates any

## Available Tools

Use these tools for requirement management:

### Create Operations
- `mcp__local__docs-create-requirement` - Create new requirement with priority and productIds

### Read Operations  
- `mcp__local__docs-list-files(type: "requirements")` - List all requirements
- `mcp__local__docs-read-files` - Read multiple requirement files at once

### Update Operations
- `mcp__local__docs-write-requirement` - Update existing requirement (with priority and productIds)

### Delete Operations
- `mcp__local__docs-delete-files` - Delete requirements (specify fileIds)

### Related Operations
- `mcp__local__docs-list-products` - Get all product IDs with overview info
- `mcp__local__docs-list-product-files` - List features/routes from specific products
- `mcp__local__docs-read-overview(type: "products")` - Read products overview
- `mcp__local__docs-write-file(type: "notes")` - Document decisions or rationale
