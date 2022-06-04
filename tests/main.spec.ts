import { genICCardCSV } from "./../utils/genICCardCSV";
import { test, expect, type Page } from "@playwright/test";
import config from "../config";

// @see https://playwright.dev/docs/test-retries#reuse-single-page-between-tests
let page: Page;

test.beforeAll(async ({ browser }) => {
  page = await browser.newPage();
  await page.goto("https://id.jobcan.jp/users/sign_in");

  await page
    .locator('[placeholder="メールアドレスまたはスタッフコード"]')
    .fill(config.email);

  await page.locator('[placeholder="パスワード"]').fill(config.password);

  await page.locator('input:has-text("ログイン")').click();
  await expect(page).toHaveURL("https://id.jobcan.jp/account/profile");
});

const ICCARD_DUMMY_DATA_PATH = "ic-card-dummy-data.csv";

test("通勤交通費精算申請", async () => {
  await genICCardCSV(
    ICCARD_DUMMY_DATA_PATH,
    config.work.office,
    config.transportation
  );

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

  // Click [placeholder="数字を入力"]
  await page
    .locator('[placeholder="数字を入力"]')
    .fill(`${config.trainPass.oneMonthFee}`);

  const [fileChooser] = await Promise.all([
    // It is important to call waitForEvent before click to set up waiting.
    page.waitForEvent("filechooser"),
    // Opens the file chooser.
    page.locator('button:has-text("ICカード読込(CSVデータ)")').click(),
  ]);
  await fileChooser.setFiles(ICCARD_DUMMY_DATA_PATH);

  // Check text=利用日 出発駅 到着駅 金額 >> input[type="checkbox"]
  await page
    .locator('text=利用日 出発駅 到着駅 金額 >> input[type="checkbox"]')
    .check();
  // Click button:has-text("交通費明細に追加する")
  await page.locator('button:has-text("交通費明細に追加する")').click();

  const inputs = page.locator('input[ng-model="row.traffic_way"]');

  const inputCount = await inputs.count();

  for (let i = 0; i < inputCount; i++) {
    await inputs.nth(i).scrollIntoViewIfNeeded();
    await inputs.nth(i).click();

    await page
      .locator("text=× 交通手段 OK キャンセル >> textarea")
      .fill("電車");
    await page.locator("text=OK").scrollIntoViewIfNeeded();
    await page.locator("text=OK").click();
  }

  // Click text=下書き保存
  await Promise.all([
    page.locator("text=下書き保存").click(),
    page.waitForNavigation({ url: "https://ssl.wf.jobcan.jp/#/myrequests" }),
  ]);
});
