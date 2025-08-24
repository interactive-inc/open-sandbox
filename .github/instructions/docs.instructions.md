---
applyTo: "**"
---

# Documentation-Driven Development MCP Tools

## Core Principles
- **Minimal specs**: Document only essentials, not implementation details
- **Active sync**: Continuously read/write specs during coding (every 5-10 lines)
- **Anti-hallucination**: ALWAYS verify domain terms via list-terms/read-term
- **ID discovery**: Get all IDs from list operations first - never guess

## MCP Tool Reference

### Route Specification Rules (write-product-route)
When using `write-product-route`, follow these conventions:

#### File Naming
```
Route Path     → pageId (File Name)
/              → home.md
/about         → about.md  
/a/b           → a.b.md
/users/profile → users.profile.md
```

#### MCP Tool Parameters
- `productId`: 製品のID (required)
- `pageId`: ページのID/ファイル名 (required)
- `relatedFeatureIds`: 関連する機能のIDの配列 (required)
- `markdown`: マークダウン内容 (required)

#### Document Structure (markdown parameter)
```markdown
# [ページ名]

[ページの目的と概要を1-2文で]

## UI/UX

UI/UXに関する最低限の情報。

## 補足A

[必要に応じて補足情報]
```

### Discovery (list-*) → Get IDs
```
list-products          → productId     | list-repositories      → repositoryId
list-product-features  → featureId     | list-repository-issues → issueId  
list-product-routes    → pageId        | list-requirements      → requirementId
list-terms            → termId         | Always list before read/write
```

### Read Operations
```
read-product           : Product details
read-product-feature   : Feature specification
read-product-route     : Page/route specification
read-repository        : Repository documentation
read-repository-issue  : Issue details
read-requirement       : Requirement specification
read-term             : Term definition
```

### Write/Update Operations
```
write-product-feature    : Create/update feature spec (see Feature Specification Rules)
write-product-route      : Create/update page spec (see Route Specification Rules)
write-repository         : Update repository docs
write-requirement        : Update requirement spec (see Requirement Specification Rules)
write-term              : Define/update terminology (see Term Definition Rules)
update-repository-issue  : Modify existing issue
```

### Create Operations
```
create-repository-issue  : New issue with tracking (see Issue Creation Rules)
create-requirement       : New system requirement (see Requirement Creation Rules)
```

### Delete Operations
```
delete-product-feature   : Remove feature spec
delete-product-route     : Remove page spec
delete-repository-issue  : Delete resolved issue
delete-requirement       : Remove requirement
delete-term             : Remove terminology
```

## Active Documentation Triggers

### Read Specs When
- Unfamiliar class/function → check terms & features
- TODO comments → check issues & requirements  
- Business logic → read feature specs
- API/routes → check route specs
- Any proper noun → verify terms

### Write/Update When
- Undefined term → write-term immediately
- Spec ≠ code → update feature spec
- Implicit rule → create-requirement
- Undocumented behavior → update specs
- Implementation challenge → create-issue

## Development Flow

```
Before: list-products → read-features → read-requirements → list-terms
During: Code → Check specs → Find mismatch → Update specs → Continue
After:  Document discoveries → Update requirements → Record route changes
```

### Continuous Loop Pattern
- Every unfamiliar term → list-terms → read-term
- Every new concept → write-term
- Every assumption → verify with read-feature
- Every discrepancy → update with write-feature
- Every implicit rule → create-requirement

## What to Document

**Include**: Business requirements, user stories, feature overview, constraints, interfaces, error strategy

**Exclude**: Algorithms, class structures, code examples, performance tuning, workarounds

## Usage Patterns

### By Task
- New feature: read specs → implement → update specs
- Bug fix: check spec mismatch → fix → update if needed
- Refactor: keep specs unchanged
- Extension: read existing → add new specs

### Automatic Behaviors
- User question → reference specs
- Code request → check specs first
- Proper noun seen → check terms
- Business logic → read features
- TODO found → check issues
- Mismatch noticed → update immediately

## Spec Types & Writing Rules

### Term Definition Rules (write-term)
```markdown
# [用語名]

[用語の簡潔かつ正確な定義]

## 例

[用語の具体的な例や使用例]

## 補足A

[必要に応じて補足情報]
```

**Guidelines**:
- 定義は明確かつ簡潔に
- 専門家でなくても理解できる例を含める
- 一般的な用語との違いを明確にする
- AIが理解できる技術的な一般的な情報は含めない

### Feature Specification Rules (write-product-feature)

#### MCP Tool Parameters
- `productId`: 製品のID (required)
- `featureId`: 機能のID/ファイル名 (required)
- `markdown`: マークダウン内容 (required)
- Note: `is-done` and `priority` are managed by MCP server

#### File Naming Convention (featureId)
- `view-*` - 詳細を確認
- `list-*` - 一覧
- `create-*` - 作成
- `delete-*` - 削除
- `add-*` - 配列に追加
- `remove-*` - 配列から削除
- `update-*` - 更新
- `show-*` - 詳細表示
- `search-*` - 検索
- その他「import」「archive」など必要に応じて使用
- ただし「manage」など粒度が大きい動詞は使用不可

#### Document Structure (markdown parameter)
```markdown
# [機能名（XXXをXXXする）]

[機能の目的と概要を1-2文で]

1. [主語]が[アクション]する
2. [主語]が[アクション]する
3. [次のステップ]

## 補足A

[必要に応じて補足情報]
```

### Requirement Creation Rules (create-requirement)

#### MCP Tool Parameters
- `repositoryId`: リポジトリのID (required)
- `requirementSlug`: slug（英数字ハイフン） (required)
- `markdown`: マークダウン内容 (required)
- `priority`: 優先度 (0=高, 1=中, 2=低) (required)
- `productIds`: 関連する製品のIDの配列 (required)

#### Document Structure (markdown parameter)
```markdown
# [要件名]

[要件の概要と目的を1-2文で]

## 詳細

[要件の詳細な説明]

## 受け入れ条件

- [条件1]
- [条件2]
- [条件3]

## 補足A

[必要に応じて補足情報]
```

### Issue Creation Rules (create-repository-issue)

#### MCP Tool Parameters
- `repositoryId`: リポジトリのID (required)
- `issueSlug`: IssueのSlug（英数字ハイフン） (required)
- `markdown`: マークダウン内容 (required)
- `relatedProductId`: 関連する製品のIDの配列 (required)
- `relatedRequirementId`: 関連する要件のID (optional)

#### Document Structure (markdown parameter)
```markdown
# [Issue名]

[Issueの概要を1-2文で]

## 詳細

[Issueの詳細な説明]

## 補足A

[必要に応じて補足情報]
```

### Summary
- **Feature**: User value unit (auth, search, notifications)
- **Route/Page**: Single URL/screen functionality
- **Requirement**: Cross-cutting constraints
- **Issue**: Implementation gaps/improvements
- **Term**: Domain concepts & definitions
