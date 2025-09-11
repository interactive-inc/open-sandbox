# サンドボックス

このリポジトリは[TanStack Start](https://tanstack.com/start/latest/docs/framework/react/overview)を用いたテンプレートです。

## 開発

```
bun i
bun run dev
```

UIライブラリは以下で最新に保つ事ができます。

```
make update
```

## システムプロンプト

ClaudeCodeでは、常にCLAUDE.mdがシステムプロンプトとして読み込まれます。そのファイルでは `@.github/**/*.md` のファイルが読み込まれています。

- `copilot-instructions.md` - プロジェクトの概要
- `instructions/core.instructions.md` - 基本的なルール
- `instructions/docs.instructions.md` - 資料のルール
- `instructions/ts.instructions.md` - コードのルール

### Vibe Coding

このリポジトリには `.docs` フォルダが存在し、製品の仕様などの情報が記録されています。この資料を使用する場合は、コマンド `/output-style` で出力スタイルを変更できます。

- `/output-style vibes` - 資料を整備しながら開発する
- `/output-style docs` - 資料を整備する

完全に必要ない場合はCLAUDE.mdから  `@.github/instructions/docs.instructions.md` を削除することで、資料管理に関するシステムプロンプトを削除できます。

初期の状態では `.docs` にはサンプルの資料が置かれているので、ClaudeCodeには初期化するように指示してください。

## 機能

### SPA

開発する製品の内容が管理画面などSPAの適している場合は、[vite.config.ts](vite.config.ts)の `spa.enable` の設定を `true` にします。

```
spa: { enabled: true },
```

### ページ

サンプルとして以下のページが存在します。

- `/` - ホーム
- `/canvas` - Canvasのサンプル
- `/error` - エラーのページの確認
