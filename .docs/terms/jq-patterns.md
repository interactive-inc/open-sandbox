---
{}
---

# jqパターン

Claude Code hooksで使用される典型的なjqコマンドパターン

## Examples

### ブロックパターン
```bash
# コマンドをブロック
jq -r 'if .tool_input.command | test("危険") then {"decision": "block", "reason": "理由"} else empty end'

# パスをブロック
jq -r 'if .tool_input.file_path | test("pattern") then {"decision": "block", "reason": "理由"} else empty end'
```

### 後処理パターン
```bash
# ファイルを選択して処理
jq -r '.tool_input.file_path | select(endswith(".ts"))' | xargs -r command

# 条件付き処理
jq -r 'if .tool_name == "Write" then .tool_input.file_path else empty end' | xargs -r command
```

### 許可パターン
```bash
# 条件付き許可
jq -r 'if .tool_name == "Read" then {"decision": "allow"} else empty end'
```

## Context

これらのパターンは90%以上のユースケースをカバーし、GUI化の基盤となる。複雑なカスタムロジックはテキストモードで対応。