# Kyomucan playscript

## 使い方

### インストール

```command
git clone git@github.com:hrdtbs/kyomucan-playscript.git
cd kyomucan-playscript
yarn install
npx playwright install --with-deps
```

### 設定

`config.tmp.ts`をコピーして、`config.ts`を作成します。

設定については`types/index.ts`に記述された型を見てください。

### 起動

コマンドで雑に起動したい場合

```command
yarn test
```

動作を確認したい場合

```command
yarn dev
```

## What

出退勤編集や交通費申請などを自動化するためのものです。

とある会社用に組んでしまっていますが、少し`tests/main.spec.ts`を変更すれば他の環境でも使えると思います。

playscript を生成するときは、[Playwright Test for VSCode](https://marketplace.visualstudio.com/items?itemName=ms-playwright.playwright)の Record new tests を利用すると楽です。

## Why

`tests/main.spec.ts`を見てください。これを手動でやるのは虚無です。

### IC カード読み込み用の CSV データよく分からないことしてない？

[jobcan の交通費明細で有効な CSV 形式](https://gist.github.com/hrdtbs/533980dfd21414e7dd6682ff609133e5)を見てください。

### なんでテストコードなの？

playwright ならテストコードの方が体験が良いのでは？と思ったので。実際良さそう。
