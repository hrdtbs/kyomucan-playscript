import { Config } from "./types";

const config: Config = {
  email: "YOUR EMAIL",
  password: "YOUR PASSWORD",
  trainPass: {
    oneMonthFee: 16720,
  },
  officeWork: {
    weekdays: [2, 4],
  },
  routes: [
    {
      from: "池袋",
      to: "東京",
      amount: 500,
    },
    {
      from: "東京",
      to: "名古屋",
      amount: 2000,
    },
    {
      from: "名古屋",
      to: "東京",
      amount: 2000,
    },
    {
      from: "東京",
      to: "池袋",
      amount: 500,
    },
  ],
};

export default config;
