import { writeFileShiftJIS } from "./writeFileShiftJIS";
import dayjs from "dayjs";

const template = (rows: string) => {
  return `allocation_date
9999/12/31,定期,この行は読み込まれません
${rows}`;
};

interface Period {
  weekdays: number[];
}

type Transportation = {
  from: string;
  to: string;
  amount: number;
}[];

export const genICCardCSV = async (
  filePath: string,
  period: Period,
  transportation: Transportation
) => {
  const firstDay = dayjs().startOf("month");
  const dayCount = firstDay.daysInMonth();
  const rows = [];
  for (let date = 1; date < dayCount + 1; date++) {
    const day = firstDay.set("date", date);
    if (period.weekdays.includes(day.day())) {
      transportation.forEach(({ from, to, amount }) => {
        rows.push(
          `${day.format("YYYY/MM/DD")},s,s,${from},s,s,${to},${amount},s,s,s`
        );
      });
    }
  }
  const data = template(rows.join("\n"));
  await writeFileShiftJIS(filePath, data);
};
