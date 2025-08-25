---
icon: 📃
schema: {}
---

# Claude Code Settings Manager

Claude Codeの設定ファイル（.claude/settings.json）を直感的なGUIで管理できるWebアプリケーション

## What We Provide

複雑なJSON構造とjqコマンドの記述を、視覚的で分かりやすいフォームUIで編集できる管理ツールを提供します。特にhooksセクションのjqコマンドを一行でJSON内に書く苦痛から解放します。

### 設定ファイルの例
```json
{
  "permissions": {
    "defaultMode": "bypassPermissions"
  },
  "enableAllProjectMcpServers": true,
  "outputStyle": "ts",
  "hooks": {
    "PreToolUse": [
      {
        "matcher": "Bash",
        "hooks": [
          {
            "type": "command",
            "command": "jq -r 'if .tool_input.command | test(\"bun run dev\") then {\"decision\": \"block\", \"reason\": \"not allowed\"} else empty end'"
          }
        ]
      }
    ]
  }
}
```

上記のような複雑なjqコマンドを含む設定を、GUIでは：
- **マッチャー選択**: ドロップダウンでツール名を選択
- **条件設定**: ビジュアルな条件ビルダーで設定
- **コマンド編集**: 複数行エディタでjqコマンドを記述
- **テスト実行**: 設定したフックの動作確認

## Products

### open-sandbox
Claude Codeの.claude/settings.json ファイルを読み書きするためのWebベースGUIツール。複雑な設定項目を整理されたフォームで表示し、直感的な操作で設定変更が可能

## Target Users

- **Claude Code利用者**: jqコマンドやJSON手動編集に苦労している開発者
- **チーム開発者**: hooks設定を共有・管理したいチーム
- **初心者**: コマンドライン操作に不慣れなユーザー

## Core Value Proposition

- **可読性向上**: 一行に詰め込まれたjqコマンドを複数行エディタで編集
- **エラー防止**: JSONシンタックスエラーやjqコマンドの文法エラーを事前検証
- **効率化**: よく使うhooksパターンをテンプレート化
- **視覚化**: 複雑な条件を視覚的に理解しやすく表示

## Context

Claude Codeの設定ファイルは強力ですが、特にhooksセクションのjqコマンドは複雑で、JSON内に一行で記述する必要があるため、編集が困難です。このツールにより、誰でも簡単に高度な設定管理ができるようになります。
