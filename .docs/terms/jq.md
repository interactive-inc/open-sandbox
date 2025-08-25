---
{}
---

# jq

JSONデータを処理するための軽量で柔軟なコマンドラインJSONプロセッサ

## Examples

- JSONデータのフィルタリング: `jq '.name'`
- 条件分岐: `jq 'if .age > 18 then "adult" else "minor" end'`
- Claude Codeでの使用: `jq -r 'if .tool_input.command | test("危険なコマンド") then {"decision": "block"} else empty end'`

## Context

Claude Codeのhooks設定では、jqコマンドを使ってツールの入力を検査し、実行を制御する。JSON内に一行で記述する必要があるため、複雑な条件では可読性が低下する問題がある。