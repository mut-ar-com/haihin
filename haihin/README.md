# MUT - 不用品回収サービス

夜間の不用品回収・粗大ゴミ回収サービスのウェブサイトです。即日対応可能で、格安料金の安心サービスを提供しています。

## 🌟 主な機能

### 1. 簡易見積もり機能 `/estimate`
- カテゴリ別（家具/家電）の品目選択
- 数量のステッパー入力
- オプションサービスの選択
- リアルタイムでの合計金額表示
- LINE経由での見積もり依頼

### 2. 料金表示機能 `/price`
- 基本料金の表示
- 品目別料金表
- オプションサービス一覧
- 料金事例の紹介

### 3. トップページ機能 `/`
- サービス概要の説明
- LINE予約への誘導
- 料金確認への導線
- サービスの特徴紹介

## 🚀 技術スタック

- React + TypeScript
- Vite
- Material-UI (MUI)
- React Router
- React Helmet Async

## 💻 開発環境のセットアップ

```bash
# リポジトリのクローン
git clone https://github.com/mut-ar-com/haihin.git
cd haihin

# 依存パッケージのインストール
npm install

# 開発サーバーの起動
npm run dev
```

## 📦 ビルドと本番環境へのデプロイ

```bash
# 本番用ビルド
npm run build

# ビルド結果のプレビュー
npm run preview
```

## 🔧 環境設定

- Node.js 18.x 以上
- npm 9.x 以上
- Vite 6.x

## 📱 対応ブラウザ

- Google Chrome（最新版）
- Safari（最新版）
- Firefox（最新版）
- Edge（最新版）

## 🤝 コントリビューション

1. このリポジトリをフォーク
2. 新しいブランチを作成（`git checkout -b feature/amazing-feature`）
3. 変更をコミット（`git commit -m 'Add some amazing feature'`）
4. ブランチにプッシュ（`git push origin feature/amazing-feature`）
5. プルリクエストを作成

## 📝 コーディング規約

- ESLintとPrettierを使用したコード整形
- コンポーネントはTypeScriptで実装
- Material-UIのテーマシステムを活用
- レスポンシブデザインの徹底

## 📄 ライセンス

このプロジェクトはMITライセンスの下で公開されています。

## 👥 開発チーム

- MUT開発チーム
- お問い合わせ：[LINEで問い合わせる](https://lin.ee/your-line-link)

## 🔄 更新履歴

### v1.0.0 (2024-03-27)
- 簡易見積もり機能の実装
- 料金表示機能の実装
- レスポンシブデザインの適用
- ダークテーマの実装
