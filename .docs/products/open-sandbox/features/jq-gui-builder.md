---
{}
---

# jqコマンドGUIビルダー機能

jqコマンドをビジュアルな条件設定で構築し、既存のjqコマンドも解析してGUI表示する機能

1. ユーザーがHooksのコマンド編集エリアを開く
2. システムが「GUIモード」と「テキストモード」の切り替えボタンを表示
3. GUIモードの場合：
   - 条件タイプを選択（コマンドチェック、パスチェック、ブロック条件など）
   - パラメータを入力（対象フィールド、条件、値など）
   - システムがjqコマンドを自動生成
4. テキストモードの場合：
   - 従来通り直接jqコマンドを入力
5. 既存のjqコマンドを読み込んだ場合：
   - パース可能ならGUIに変換
   - 不可能ならテキストモードにフォールバック

## Note A - 対応パターン

### 1. ツール実行ブロック
```json
{
  "type": "block_command",
  "field": "tool_input.command",
  "pattern": "rm -rf",
  "message": "危険なコマンドは実行できません"
}
```
→ `jq -r 'if .tool_input.command | test("rm -rf") then {"decision": "block", "reason": "危険なコマンドは実行できません"} else empty end'`

### 2. ファイルパスブロック
```json
{
  "type": "block_path",
  "field": "tool_input.file_path",
  "pattern": "^\\.docs/",
  "message": "docsフォルダへのアクセス禁止"
}
```
→ `jq -r 'if .tool_input.file_path | test("^\\.docs/") then {"decision": "block", "reason": "docsフォルダへのアクセス禁止"} else empty end'`

### 3. 後処理実行
```json
{
  "type": "post_process",
  "field": "tool_input.file_path",
  "pattern": "\\.(ts|tsx)$",
  "command": "bun run format"
}
```
→ `jq -r '.tool_input.file_path | select(endswith(".ts") or endswith(".tsx"))' | xargs -r bun run format`

### 4. 条件付き許可
```json
{
  "type": "conditional_allow",
  "conditions": [
    {"field": "tool_name", "equals": "Write"},
    {"field": "tool_input.file_path", "pattern": "\\.test\\."}
  ]
}
```
→ `jq -r 'if .tool_name == "Write" and (.tool_input.file_path | test("\\.test\\.")) then {"decision": "allow"} else empty end'`

## Note B - GUI要素

### 条件タイプセレクタ
- ブロック条件（block_command, block_path）
- 後処理実行（post_process）
- 条件付き許可（conditional_allow）
- カスタム（テキストモードへ）

### 入力フィールド
- **対象フィールド**: ドロップダウン（tool_input.command, tool_input.file_path, tool_name等）
- **条件タイプ**: セレクタ（contains, equals, regex, startsWith, endsWith）
- **値**: テキスト入力
- **メッセージ/コマンド**: テキスト入力

### 複合条件
- AND/OR条件の追加ボタン
- 条件のグループ化
- ネスト構造の視覚化

## Note C - 相互変換

### jq → GUI変換
1. jqコマンドをパース
2. 既知のパターンと照合
3. マッチしたらGUI要素に分解
4. マッチしない場合はテキストモード維持

### GUI → jq変換
1. GUI設定を収集
2. テンプレートに基づいてjqコマンド生成
3. エスケープ処理
4. JSONエディタに反映

## Note D - フォールバック

以下の場合はテキストモードを使用：
- 複雑なカスタムjqコマンド
- パース不可能な構文
- ユーザーが明示的にテキストモードを選択
- 未対応のjq関数使用時