<div id="top"></div>

# NATURE EXCELA APP
### ストーリー
<!-- プロジェクトについて -->
以前Page Routerで制作したNATURE EXCELAに、ログイン認証、決済機能、ユーザーページ、お気に入り登録機能を追加し、実際に運用できるECサイトとしてApp Routerでブラッシュアップしました。

## URL
https://nature-excela-app.vercel.app
 <br >
『ゲストでログインボタン』から、メールアドレスとパスワードを入力せずにログインできます。

## 使用技術一覧

<!-- シールド一覧 -->
<!-- 該当するプロジェクトの中から任意のものを選ぶ-->
<p style="display: inline">
  <!-- フロントエンドの言語一覧 -->
  <img src="https://img.shields.io/badge/-typescript-000000?style=for-the-badge&logo=typescript&logoColor=FFE500">
  <!-- フロントエンドのフレームワーク一覧 -->
  <img src="https://img.shields.io/badge/-react-000000?style=for-the-badge&logo=react&logoColor=61DAFB">
  <img src="https://img.shields.io/badge/-Next.js-000000.svg?logo=next.js&style=for-the-badge">
  <img src="https://img.shields.io/badge/-prisma-000000?style=for-the-badge&logo=prisma&logoColor=2D3748">
  <img src="https://img.shields.io/badge/-stripe-000000?style=for-the-badge&logo=stripe&logoColor=635BFF">
  <img src="https://img.shields.io/badge/-cssmodules-000000?style=for-the-badge&logo=cssmodules&logoColor=000000">
  <img src="https://img.shields.io/badge/-supabase-000000?style=for-the-badge&logo=supabase&logoColor=3FCF8E">
  <!-- バックエンドの言語一覧 -->
  <!-- ミドルウェア一覧 -->
  <!-- インフラ一覧 -->
</p>

## 機能一覧
- ユーザー認証、データ管理(Supabase)、データベース連携(Prisma)
- 商品登録・管理(microCMS)
- カート状態管理(Jotai)

<!-- 
- ユーザー登録、ログイン機能(devise)
- 投稿機能
  - 画像投稿(refile)
  - 位置情報検索機能(geocoder)
- いいね機能(Ajax)
  - ランキング機能
- コメント機能(Ajax)
- フォロー機能(Ajax)
- ページネーション機能(kaminari)
  - 無限スクロール(Ajax)
- 検索機能(ransack)
-->

## テスト
- Storybook(アクセシビリティ、インタラクション)
  - お気に入り機能
  - ユーザー画像
  - 認証機能

## 環境

<!-- 言語、フレームワーク、ミドルウェア、インフラの一覧とバージョンを記載 -->

| 言語・フレームワーク  | バージョン |
| --------------------- | ---------- |
| Node.js               | 24.5.0    |
| React                 | 19.1.0     |
| Next.js               | 15.4.6     |

その他のパッケージのバージョンは package.json を参照してください. 


## プロジェクト詳細
### 既存サイトのブラッシュアップ(ECサイト)
#### ブラッシュアップ前 ( https://nature-excela.vercel.app )
- Page Router(JS)
- グローバルステート (recoil) ＊カート機能に使用
- 支払い機能なし
- テストなし
- 認証機能なし ＊ユーザーページなし
- DBなし
- 画像配置(publicフォルダ)
--------------------------------------------
#### ブラッシュアップ後 ( https://nature-excela-app.vercel.app )
- App Router(TS)
- グローバルステート (Jotai)　＊recoilが開発終了のため ＊カート機能に使用
- 支払い機能あり(テストのみ)
- テストあり (storybook vitest)
- 認証機能あり (NextAuth.js)
- DBあり(supabase) ＊アダプターにPrisma ＊ユーザーページ
- 画像配置(microCMS)

#### その他詳細
https://asami-portfolio.vercel.app/projects/nature-app

<p align="right">(<a href="#top">トップへ</a>)</p>
