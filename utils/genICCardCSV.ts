import { writeFileShiftJIS } from "./writeFileShiftJIS";
import dayjs from "dayjs";
import { Period, Routes } from "../types";

const template = (rows: string) => {
  return `allocation_date
9999/12/31,定期,この行は読み込まれません
${rows}`;
};

export const genICCardCSV = async (
  filePath: string,
  period: Period,
  routes: Routes
) => {
  const firstDay = dayjs().startOf("month");
  const dayCount = firstDay.daysInMonth();
  const rows: string[] = [];
  for (let date = 1; date < dayCount + 1; date++) {
    const day = firstDay.set("date", date);
    if (period.weekdays.includes(day.day())) {
      routes.forEach(({ from, to, amount }) => {
        rows.push(
          `${day.format("YYYY/MM/DD")},s,s,${from},s,s,${to},${amount},s,s,s`
        );
      });
    }
  }
  const data = template(rows.join("\n"));
  await writeFileShiftJIS(filePath, data);
};
