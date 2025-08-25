---
applyTo: "**"
---

# Documentation-Driven Development MCP Tools

## MCP Tool Technical Specification

This document defines the technical specifications for MCP tools, data formats, and parameters.
For AI behavior and interaction patterns, see claude.output-styles/docs.md.

## MCP Tool Reference

### Route Specification Rules (docs-write-product-route)
When using `docs-write-product-route`, follow these conventions:

#### File Naming
```
Route Path     → pageId (File Name)
/              → home.md
/about         → about.md  
/a/b           → a.b.md
/users/profile → users.profile.md
```

#### MCP Tool Parameters
- `productId`: Product ID (required)
- `pageId`: Page ID to write or update (required)
- `relatedFeatureIds`: Array of related feature IDs (required)
- `markdown`: Markdown content (required)

#### Document Structure (markdown parameter)
**Required sections**: Title, Description, UI/UX
**Optional sections**: Context, Note A (can have multiple: Note A, Note B, etc.)

```markdown
# [Page Name]

[Page purpose and overview in 1-2 sentences]

## UI/UX

Minimal UI/UX information needed.

## Context (Optional)

[Background on how this decision/implementation was reached]

## Note A (Optional)

[Additional information as needed]
```

### Discovery Operations → Get IDs
```
docs-list-files           → Get IDs from root directories (repositories, requirements, terms, issues, notes)
docs-list-products        → Get all product IDs and their overview info
docs-list-product-files   → Get feature/route IDs from specific product
docs-list-repository-issues → Get issue IDs for specific repository

Always list before read/write operations to retrieve correct IDs
```

### Read Operations
```
docs-read-files          : Read multiple documents from root directory
docs-read-overview       : Read overview (type: "project" for project overview)
docs-read-product-features : Read multiple features from a specific product
docs-read-product-routes  : Read multiple routes from a specific product
docs-read-product-overview : Read overview from product subdirectories (features/routes)
```

### Write/Update Operations
```
docs-write-file              : Write or update files in terms/repositories/notes/issues directories
docs-write-product-feature    : Write or update a product feature
docs-write-product-route      : Write or update a product route page
docs-write-product-overview   : Write or update overview in product subdirectories
docs-write-requirement        : Write or update a requirement definition (with priority and productIds)
docs-write-overview          : Write or update overview (type: "project" for project overview)
```

### Create Operations
```
docs-create-product          : Create a new product with directory structure
docs-create-repository-issue  : Create a new issue in a repository
docs-create-requirement       : Create a new requirement definition
```

### Delete Operations
```
docs-delete-product        : Delete entire product and all its contents
docs-delete-files          : Delete multiple documents (overview cannot be deleted)
docs-delete-product-files  : Delete multiple features or routes from a specific product
```

### Product Management Operations

#### Product Creation (docs-create-product)
**MCP Tool Parameters**:
- `productId`: Product ID (alphanumeric with hyphens) (required)
- `productName`: Product display name (required)
- `markdown`: Markdown content for product overview (required)

**Creates the following structure**:
```
products/
  [productId]/
    index.md          # Product overview
    features/
      index.md        # Features overview
    routes/
      index.md        # Routes overview
```

#### Product Deletion (docs-delete-product)
**MCP Tool Parameters**:
- `productId`: Product ID to delete (required)

**Deletes entire product directory including**:
- Product overview (index.md)
- All features and their overview
- All routes and their overview

## Documentation Content Guidelines

**Include in specs**: Business requirements, user stories, feature overview, constraints, interfaces, error strategy

**Exclude from specs**: Algorithms, class structures, code examples, performance tuning, workarounds

**Note**: Use `type: "project"` parameter to access overall project overview.

## Spec Types & Writing Rules

### Section Naming Rules
**IMPORTANT**: All section names are fixed and cannot be changed. Use exact English names as specified below.
- Required sections must be included in the specified order
- Optional sections (marked with "Optional") can be omitted but must use exact names when included
- Do not translate or modify section names
- Do not add sections not specified in the templates
- **Language Rule**: Section headers must be in English, but content must be written in Japanese
  - Example: `## Features` (header in English) → Content describing features in Japanese
  - This applies to ALL documentation types

### Overview Rules (docs-write-overview, docs-write-product-overview)
Each directory type has specific overview content requirements:

#### Project Overview (type: "project")
**Required sections**: Title, Description, What We Provide, Products, Target Users, Core Value Proposition
**Optional sections**: Context

```markdown
# [Project Name]

[One-line description of what this project offers to users]

## What We Provide

[Brief overview of the services and value this project delivers]

## Products

### [Product A Name]
[Brief description of what this product does and who uses it]

### [Product B Name]
[Brief description of what this product does and who uses it]

### [Product C Name]
[Brief description of what this product does and who uses it]

## Target Users

[Who this project serves and their primary needs]
- User Type A: [Their needs]
- User Type B: [Their needs]

## Core Value Proposition

[What makes this project unique and valuable]

## Context (Optional)

[Important background or decisions that shaped the project]
```

#### Products Overview (type: "products")
**Required sections**: Title, Description, Product Relationships
**Optional sections**: Architecture Context

```markdown
# Products Overview

[Brief description of all products in the system]

## Product Relationships

[How products interact and depend on each other]
- Product A → Product B relationship
- Shared components or services
- Data flow between products

## Architecture Context

[High-level system architecture if relevant]
```

#### Features Overview (product subdirectory)
**Required sections**: Title, Description, Core Features
**Optional sections**: Feature Categories

```markdown
# Features Overview

[High-level summary of what this product does]

## Core Features

[Brief list of main features with one-line descriptions]
- Feature A: [Brief description]
- Feature B: [Brief description]

## Feature Categories

[How features are organized or grouped]
```

#### Routes Overview (product subdirectory)
**Required sections**: Title, Description, Authentication Flow, Page Hierarchy
**Optional sections**: Navigation Context

```markdown
# Routes Overview

[Navigation structure and page flow]

## Authentication Flow

[Which routes require authentication]
- Public routes: [list]
- Protected routes: [list]

## Page Hierarchy

[How pages connect and flow]
- Landing → Dashboard → Details
- User flow patterns

## Navigation Context

[Special navigation rules or patterns]
```

#### Repositories Overview (type: "repositories")
**Required sections**: Title, Description, Repository Relationships
**Optional sections**: Technology Stack

```markdown
# Repositories Overview

[Purpose and structure of repositories]

## Repository Relationships

[How repositories depend on each other]
- Frontend → API dependencies
- Shared libraries
- Deployment relationships

## Technology Stack

[Brief overview of tech used across repos]
```

### Repository Documentation Rules (docs-write-file with type: "repositories")

#### File Naming Convention
- Use repository name as fileId: `frontend-app.md`, `backend-api.md`
- Match actual repository names from version control

#### Document Structure (markdown parameter)
**Required sections**: Title, Description, Responsibility, Dependencies, Architecture Decisions
**Optional sections**: Context, Note A (can have multiple: Note A, Note B, etc.)

```markdown
# [Repository Name]

[Brief description of what this repository contains and its business purpose]

## Responsibility

[What this repository is responsible for in the system]
- Core functionality it provides
- Business domains it covers
- Services it exposes

## Dependencies

[Critical dependencies on other repositories and services]
- Which repositories it depends on
- External services it consumes
- Data sources it requires

## Architecture Decisions

[Key architectural patterns and decisions]
- Major design patterns used
- Important technical choices made
- Architectural constraints

## Context (Optional)

[Historical decisions or important background that affects current design]

## Note A (Optional)

[Additional specification-relevant information]
```

### Term Definition Rules (docs-write-term)
**Required sections**: Title, Definition, Examples
**Optional sections**: Context, Note A (can have multiple: Note A, Note B, etc.)

```markdown
# [Term Name]

[Concise and accurate definition of the term]

## Examples

[Specific examples or use cases of the term]

## Context (Optional)

[How this term was decided or evolved]

## Note A (Optional)

[Additional information as needed]
```

**Guidelines**:
- Keep definitions clear and concise
- Include examples that non-experts can understand
- Clarify differences from common terminology
- Exclude general technical information that AI already knows

### Feature Specification Rules (docs-write-product-feature)

#### MCP Tool Parameters
- `productId`: Product ID (required)
- `featureId`: Feature ID to write or update (required)
- `markdown`: Markdown content (required)

#### File Naming Convention (featureId)
- `view-*` - View details
- `list-*` - List items
- `create-*` - Create new
- `delete-*` - Delete existing
- `add-*` - Add to array
- `remove-*` - Remove from array
- `update-*` - Update existing
- `show-*` - Show details
- `search-*` - Search functionality
- Others like `import`, `archive` as needed
- Avoid broad verbs like `manage`

#### Document Structure (markdown parameter)
**Required sections**: Title, Description, Steps (numbered list)
**Optional sections**: Context, Note A (can have multiple: Note A, Note B, etc.)

```markdown
# [Feature Name (Action XXX)]

[Feature purpose and overview in 1-2 sentences]

1. [主体]が[アクション]を実行
2. [主体]が[アクション]を実行
3. [次のステップ]

## Context (Optional)

[Why this feature was designed this way]

## Note A (Optional)

[Additional information as needed]
```

### Requirement Creation Rules (docs-create-requirement)

#### MCP Tool Parameters
- `requirementSlug`: Requirement slug (alphanumeric with hyphens) (required)
- `markdown`: Markdown content (required)
- `priority`: Requirement priority (0: high, 1: medium, 2: low) (required)
- `productIds`: Array of related product IDs (required)

#### Document Structure (markdown parameter)
**Required sections**: Title, Description, Details, Acceptance Criteria
**Optional sections**: Context, Note A (can have multiple: Note A, Note B, etc.)

```markdown
# [Requirement Name]

[Requirement overview and purpose in 1-2 sentences]

## Details

[Detailed explanation of the requirement]

## Acceptance Criteria

- [Criterion 1]
- [Criterion 2]
- [Criterion 3]

## Context (Optional)

[Background or reasoning for this requirement]

## Note A (Optional)

[Additional information as needed]
```

### Issue Creation Rules (docs-create-repository-issue)

#### MCP Tool Parameters
- `repositoryId`: Repository ID (required)
- `issueSlug`: Issue slug (alphanumeric with hyphens) (required)
- `markdown`: Markdown content (required)
- `requirementId`: Related requirement ID (optional)

#### Document Structure (markdown parameter)
**Required sections**: Title, Description, Details
**Optional sections**: Context, Note A (can have multiple: Note A, Note B, etc.)

```markdown
# [Issue Name]

[Issue overview in 1-2 sentences]

## Details

[Detailed explanation of the issue]

## Context (Optional)

[How this issue was discovered or why it needs addressing]

## Note A (Optional)

[Additional information as needed]
```

### Notes Specification Rules (docs-write-file with directory: "notes")

#### Purpose
Notes are supplementary documentation for:
- Development decisions and rationale
- Technical debt tracking
- Meeting minutes and discussions
- Research findings
- Migration plans
- Architecture Decision Records (ADRs)
- Temporary workarounds with context

#### File Naming Convention
- Use descriptive slugs: `2025-01-migration-plan.md`
- Date prefixes for time-sensitive notes: `YYYY-MM-DD-topic.md`
- Category prefixes: `adr-001-database-choice.md`, `meeting-2025-01-15.md`

#### Document Structure
**Required sections**: Title, Description, Background, Content
**Optional sections**: Decisions, Action Items, Context

```markdown
# [Note Title]

[Brief overview of what this note covers]

## Background

[Context and why this note exists]

## Content

[Main content of the note]

## Decisions (Optional)

[Any decisions made if applicable]

## Action Items (Optional)

[Follow-up tasks if applicable]

## Context (Optional)

[Additional historical context]
```

### Unified File Writing (docs-write-file)

#### MCP Tool Parameters
- `type`: Type of document to write ("terms", "repositories", "notes", "issues") (required)
- `fileId`: File ID to write or update (required)
- `markdown`: Markdown content (required)

#### Usage Examples
```
# Write a term definition
docs-write-file(type: "terms", fileId: "user-session", markdown: "...")

# Write a repository document
docs-write-file(type: "repositories", fileId: "frontend-app", markdown: "...")

# Write a note
docs-write-file(type: "notes", fileId: "2025-01-migration-plan", markdown: "...")

# Write an issue (replaces docs-write-repository-issue)
docs-write-file(type: "issues", fileId: "2025.01.15.performance-issue", markdown: "...")
```

### Summary
- **Feature**: User value unit (auth, search, notifications)
- **Route/Page**: Single URL/screen functionality
- **Requirement**: Cross-cutting constraints
- **Issue**: Implementation gaps/improvements
- **Term**: Domain concepts & definitions
- **Repository**: Codebase documentation
- **Note**: Supplementary documentation and decisions
