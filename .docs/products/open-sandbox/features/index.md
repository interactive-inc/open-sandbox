---
icon: ""
schema: {}
---

# Features Overview

Claude Code設定ファイル管理ツールの主要機能

## Core Features

- **ビジュアルhooksエディタ**: jqコマンドを複数行エディタで視覚的に編集
- **jqコマンドGUIビルダー**: 条件設定をGUIで構築、既存jqの解析・表示
- **Matcher選択機能**: ツール名をドロップダウンで簡単に選択（Task, Bash, Readなど）
- **JSONリアルタイム同期**: GUI操作とJSONエディタの双方向同期
- **設定検証**: jqコマンドの文法チェックとJSONバリデーション

## Feature Categories

### Hooks管理機能
- PreToolUse/PostToolUseの設定
- Matcherドロップダウン選択（基本ツール + カスタム入力）
- jqコマンドGUIビルダー（ブロック、後処理、条件付き許可）
- GUI/テキストモード切り替え
- Hookの追加・削除

### 基本設定機能
- Permissionsモード設定（ask/bypassPermissions/allowAllMutativeOperations）
- MCPサーバー有効化設定
- Output Styleの設定

### 補助機能
- リアルタイムJSON同期（GUI ⇔ JSONエディタ）
- jqコマンドのパース・自動生成
- パターン認識とフォールバック
- JSONのコピー&ペースト対応
- 設定の検証とエラー表示
