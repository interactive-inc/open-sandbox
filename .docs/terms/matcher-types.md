---
{}
---

# Matcherタイプ

Claude Code hooksで使用できるmatcher（マッチャー）の種類と指定方法

## Examples

### 基本ツール
- `Task` - サブエージェントタスク実行時
- `Bash` - シェルコマンド実行時
- `Read` - ファイル読み込み時
- `Write` - ファイル書き込み時
- `Edit` - ファイル編集時
- `MultiEdit` - 複数箇所編集時
- `Glob` - ファイルパターン検索時
- `Grep` - コンテンツ検索時
- `WebFetch` - Web取得時
- `WebSearch` - Web検索時

### パターンマッチング
- `*` または `""` - 全てのツールにマッチ
- `Edit|Write` - EditまたはWriteにマッチ（正規表現）
- `Notebook.*` - Notebookで始まる全ツール

### MCPツール
- `mcp__<サーバー名>__<ツール名>` の形式
- 例: `mcp__memory__create_entities`

### 特殊イベント
- PreCompact: `manual`, `auto`
- SessionStart: `startup`, `resume`, `clear`

## Context

Claude Codeのhooks設定で、どのツールやイベントに対してフックを実行するかを指定するための値。正規表現もサポートしており、柔軟なマッチングが可能。