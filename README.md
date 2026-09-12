# 日本の土地と建物はどう名義が動いてきたか

法務省「登記統計」をもとに、不動産の売買・相続と会社の設立を探索するダッシュボード。

`housing`（住まい）の姉妹。visualizing.jp スタンドアロン。

想定URL: https://japan-data-registry.visualizing.jp

## ビュー

| ビュー | 内容 |
| --- | --- |
| 時代 | 登記総数・不動産・土地・建物、売買・相続・贈与・抵当の長期推移 |
| 種類 | 土地の登記種類（売買・相続・抵当・贈与・保存・表示） |
| 商業 | 株式会社と合同会社の設立・解散 |

## 開発

```bash
npm install
npm run fetch && npm run data && npm run verify
npm run dev
```

Excel は `data/raw/` に置く（git 管理外）。配信用 JSON は `public/data/` を追跡する。API キーは不要。

| スクリプト | 内容 |
| --- | --- |
| `npm run fetch` | e-Stat 年報 Excel の取得 |
| `npm run data` | 配信用 cube 構築（Python / openpyxl） |
| `npm run verify` | 健全性チェック |
| `npm run dev` | Vite 開発サーバ（5294） |
| `npm run build` | 本番ビルド |
| `npm run typecheck` | TypeScript 検査 |

データ設計の正本は [`docs/data-sources.md`](docs/data-sources.md)。

## GitHub Pages / DNS

- `.github/workflows/pages.yml` で Pages にデプロイする。
- カスタムドメイン `japan-data-registry.visualizing.jp` は、Pages 設定と visualizing.jp 側 DNS（既存シリーズと同じ運用）で登録する。
