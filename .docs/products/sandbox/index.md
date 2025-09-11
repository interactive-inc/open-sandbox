# open-sandbox

Claude Codeの設定ファイル（.claude/settings.json）を視覚的に管理できるWebベースのGUIツール

## What We Provide

複雑なJSON構造の設定ファイルを、整理されたフォームUIで直感的に編集できる環境を提供。エラーを防ぎ、効率的な設定管理を実現

## Target Users

- **開発者**: Claude Codeを日常的に使用し、設定を頻繁に調整する必要がある人
- **チームリーダー**: チーム全体の設定標準化とプリセット管理を行う人
- **初心者**: JSON編集に不慣れだが、Claude Codeを使い始めたい人

## Core Value Proposition

- **エラー防止**: バリデーションによる設定ミスの即座検出
- **効率化**: GUIによる素早い設定変更と検索機能
- **標準化**: プリセットによるチーム設定の統一
- **可視化**: 設定の差分表示と履歴管理

## Technical Architecture

- **Frontend**: React + TypeScript + Vite
- **UI Framework**: shadcn/ui + Tailwind CSS
- **Form Management**: React Hook Form + Zod validation
- **Routing**: TanStack Router
- **Storage**: Browser LocalStorage for temporary data
- **File Handling**: File System Access API
