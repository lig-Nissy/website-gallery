# Website Gallery

Webサイトのギャラリーアプリケーション。サイトをカテゴリやタグで管理し、一覧表示できます。

## 技術スタック

- **Framework**: Next.js 16.2.1
- **UI**: React 19 + Tailwind CSS 4
- **Backend**: Supabase (認証・データベース)
- **Language**: TypeScript

## セットアップ

### 1. 依存関係のインストール

```bash
npm install
```

### 2. 環境変数の設定

`.env.local` ファイルを作成し、Supabaseの接続情報を設定してください。

```env
NEXT_PUBLIC_SUPABASE_URL=your-supabase-url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-supabase-anon-key
```

### 3. 開発サーバーの起動

```bash
npm run dev
```

[http://localhost:2424](http://localhost:2424) でアクセスできます。

## スクリプト

| コマンド | 説明 |
|---------|------|
| `npm run dev` | 開発サーバー起動（ポート2424） |
| `npm run build` | プロダクションビルド |
| `npm run start` | プロダクションサーバー起動 |
| `npm run lint` | ESLintによるコードチェック |

## プロジェクト構成

```
src/
├── app/                    # Next.js App Router
│   ├── admin/             # 管理画面
│   │   ├── categories/    # カテゴリ管理
│   │   ├── tags/          # タグ管理
│   │   ├── sites/         # サイト管理
│   │   └── profile/       # 管理者設定
│   ├── admin-profile/     # 管理者について（公開）
│   ├── about/             # このサイトについて
│   ├── privacy/           # プライバシーポリシー
│   ├── api/               # APIルート
│   │   └── ogp/           # OGP取得API
│   └── login/             # ログインページ
├── components/            # 共通コンポーネント
│   └── Footer.tsx         # フッター
├── features/              # 機能別モジュール
│   ├── admin-profile/     # 管理者プロフィール機能
│   ├── auth/              # 認証機能
│   ├── categories/        # カテゴリ機能
│   ├── sites/             # サイト機能
│   └── tags/              # タグ機能
└── lib/                   # ユーティリティ
    └── supabase*.ts       # Supabaseクライアント
```

## 機能

- サイトの一覧表示（ギャラリー形式）
- カテゴリ・タグによるフィルタリング
- ページネーション
- 管理画面（サイト/カテゴリ/タグ/管理者のCRUD）
- 認証機能（ログイン/ログアウト）
- OGP情報の自動取得

## ページ一覧

| パス | 説明 |
|------|------|
| `/` | トップページ（サイト一覧） |
| `/about` | このサイトについて |
| `/admin-profile` | 管理者について |
| `/privacy` | プライバシーポリシー |
| `/login` | ログイン |
| `/admin` | 管理画面（サイト追加） |
| `/admin/sites` | サイト一覧管理 |
| `/admin/categories` | カテゴリ管理 |
| `/admin/tags` | タグ管理 |
| `/admin/profile` | 管理者設定 |
