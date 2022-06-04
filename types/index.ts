export interface Period {
  /**
   * 指定した曜日を含める
   * 0~6
   */
  weekdays: number[];
  /**
   * 当月以外で生成する
   * 1~12
   */
  month?: number;
  /**
   * 指定した日付を含める
   * 1~31
   */
  days?: number[];
  /**
   * 指定した日付を除く
   * 1~31
   */
  excludes?: number[];
}

export type Routes = {
  from: string;
  to: string;
  amount: number;
}[];

export interface Config {
  email: string;
  password: string;
  trainPass: {
    oneMonthFee: number;
  };
  officeWork: Period;
  routes: Routes;
}
