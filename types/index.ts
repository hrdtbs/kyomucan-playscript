export interface Period {
  weekdays: number[];
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
