# Kyomucan playscript

## What

`config.ts`の内容を元にとある会社の交通費精算申請の下書きと出退勤編集の保存を行います。
設定については型を見てください。

とある会社用に組んでしまっていますが、少し`tests/main.spec.ts`を変更すれば他の環境でも使えると思います。

playscript を生成するときは、[Playwright Test for VSCode](https://marketplace.visualstudio.com/items?itemName=ms-playwright.playwright)の Record new tests を利用すると楽です。

## Why

`tests/main.spec.ts`を見てください。これを手動でやるのは虚無です。

### IC カード読み込み用の CSV データよく分からないことしてない？

[jobcan の交通費明細で有効な CSV 形式](https://gist.github.com/hrdtbs/533980dfd21414e7dd6682ff609133e5)を見てください。

### なんでテストコードなの？

playwright ならテストコードの方が体験が良いのでは？と思ったので。実際良さそう。
