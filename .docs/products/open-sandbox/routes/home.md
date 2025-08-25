---
features:
  - edit-hooks
  - select-matcher
  - json-sync
---

# ホームページ

Claude Code設定ファイル管理のメイン画面。2カラムレイアウトで設定編集とJSON表示を同時に行える。

## UI/UX

### レイアウト
- **左側**: GUI設定エリア（タブ切り替え）
  - Hooksタブ: PreToolUse/PostToolUseの設定
  - 基本設定タブ: Permissions、MCPサーバー、Output Style
- **右側**: JSONエディタ（sticky表示）
  - リアルタイム同期
  - コピー&ペースト対応

### Hooksタブ
- PreToolUse/PostToolUseセクション
- 各Hookに対して：
  - Matcher選択（ドロップダウン/コンボボックス）
  - jqコマンドエディタ（複数行）
  - 削除ボタン
- 新規Hook追加ボタン

### 基本設定タブ
- Permissionsモード（ラジオボタン）
- MCPサーバー有効化（スイッチ）
- Output Style入力（テキストフィールド）