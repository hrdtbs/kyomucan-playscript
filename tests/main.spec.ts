import { test, expect } from "@playwright/test";

test("test", async ({ page }) => {
  // Go to https://id.jobcan.jp/users/sign_in
  await page.goto("https://id.jobcan.jp/users/sign_in");

  // Click [placeholder="メールアドレスまたはスタッフコード"]
  await page
    .locator('[placeholder="メールアドレスまたはスタッフコード"]')
    .click();

  // Fill [placeholder="メールアドレスまたはスタッフコード"]
  await page
    .locator('[placeholder="メールアドレスまたはスタッフコード"]')
    .fill(process.env.EMAIL);

  // Click [placeholder="パスワード"]
  await page.locator('[placeholder="パスワード"]').click();

  // Fill [placeholder="パスワード"]
  await page.locator('[placeholder="パスワード"]').fill(process.env.PASSWORD);

  // Click input:has-text("ログイン")
  await page.locator('input:has-text("ログイン")').click();
  await expect(page).toHaveURL("https://id.jobcan.jp/account/profile");

  page.goto("https://ssl.wf.jobcan.jp/#/request/new/112865/");

  // Click text=【通勤】交通費精算申請書
  await page.locator("text=【通勤】交通費精算申請書").click();

  // Click text=【通勤】交通費精算申請書
  await page.locator("text=【通勤】交通費精算申請書").click();

  // Click [placeholder="申請のタイトルを入力してください（必須）"]
  await page
    .locator('[placeholder="申請のタイトルを入力してください（必須）"]')
    .click();

  // Fill [placeholder="申請のタイトルを入力してください（必須）"]
  await page
    .locator('[placeholder="申請のタイトルを入力してください（必須）"]')
    .fill("交通費精算");

  // Press Enter
  await page
    .locator('[placeholder="申請のタイトルを入力してください（必須）"]')
    .press("Enter");

  // Fill [placeholder="申請のタイトルを入力してください（必須）"]
  await page
    .locator('[placeholder="申請のタイトルを入力してください（必須）"]')
    .fill("交通費精算申請書");

  // Press Enter
  await page
    .locator('[placeholder="申請のタイトルを入力してください（必須）"]')
    .press("Enter");

  // Click textarea[name="pay_content"]
  await page.locator('textarea[name="pay_content"]').click();

  // Fill textarea[name="pay_content"]
  await page.locator('textarea[name="pay_content"]').fill("通勤交通費のみ");

  // Click pre:has-text("明細行の金額の合計が反映されます。")
  await page
    .locator('pre:has-text("明細行の金額の合計が反映されます。")')
    .click();

  // Click text=非該当 >> nth=0
  await page.locator("text=非該当").first().click();

  // Click text=非該当 >> nth=1
  await page.locator("text=非該当").nth(1).click();

  // Click text=非該当 >> nth=2
  await page.locator("text=非該当").nth(2).click();

  // Click text=この申請には通勤 ①自宅⇔会社 ②直行・直帰 以外の交通費は含まれません。
  await page
    .locator(
      "text=この申請には通勤 ①自宅⇔会社 ②直行・直帰 以外の交通費は含まれません。"
    )
    .click();

  const [fileChooser] = await Promise.all([
    // It is important to call waitForEvent before click to set up waiting.
    page.waitForEvent("filechooser"),
    // Opens the file chooser.
    page.locator('button:has-text("ICカード読込(CSVデータ)")').click(),
  ]);
  await fileChooser.setFiles("myfile.pdf");
});
