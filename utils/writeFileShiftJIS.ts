import fs from "fs/promises";
import iconv from "iconv-lite";

export const writeFileShiftJIS = (filePath: string, data: string) => {
  const buf = iconv.encode(data, "Shift_JIS");
  return fs.writeFile(filePath, buf);
};
