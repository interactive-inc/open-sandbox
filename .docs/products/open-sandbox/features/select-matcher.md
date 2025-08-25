---
{}
---

# Matcher選択機能

hooks設定でmatcherを選択式のドロップダウンまたはコンボボックスで指定できる機能

1. ユーザーがホームページのHooksタブを開く
2. PreToolUse/PostToolUseセクションでmatcherフィールドを確認
3. ドロップダウン/コンボボックスから選択
   - Task, Bash, Read, Write, Edit など基本ツール
   - `*` (全ツール) オプション
   - カスタム入力も可能（正規表現やMCPツール名）
4. 選択または入力したmatcherが設定に反映される
5. JSONエディタにも即座に反映

## Note A

選択肢には以下を含める：
- **基本ツール**: Task, Bash, Read, Write, Edit, MultiEdit, Glob, Grep, WebFetch, WebSearch
- **特殊パターン**: `*` (全て), カスタム入力
- **よく使う組み合わせ**: `Edit|Write`, `Notebook.*`

カスタム入力では正規表現やMCPツール名（`mcp__xxx__yyy`形式）も入力可能にする。

## Note B

実装場所：
- `/` (ホームページ)のHooksタブ内
- src/routes/index.tsx の231行目と309行目のInputコンポーネントを置き換え