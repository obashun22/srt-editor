import { SrtBlock } from "../types/Srt";

export const parseSrtFile = async (file: File): Promise<SrtBlock[]> => {
  const contents = await file.text(); // ファイルの内容を取得
  const lines = contents.split("\n"); // 改行で行を分割

  const srtBlock: SrtBlock[] = [];

  let i = 0;
  while (i < lines.length) {
    // SRTファイルの1行目はID
    const id = parseInt(lines[i++], 10);

    // SRTファイルの2行目は時間情報
    const [timeStartStr, timeEndStr] = lines[i++].split(" --> ");
    const start = parseTime(timeStartStr.trim());
    const end = parseTime(timeEndStr.trim());

    // SRTファイルの3行目以降はテキスト
    let subtitle = "";
    while (i < lines.length && lines[i].trim() !== "") {
      subtitle += lines[i++] + "\n";
    }
    subtitle = subtitle.trim();

    srtBlock.push({
      id,
      start,
      end,
      subtitle,
    });
    i++;
  }

  return srtBlock;
};

export const parseTime = (timeStr: string) => {
  const [hms, ms] = timeStr.split(",");
  const [hours, minutes, seconds] = hms.split(":").map(Number);
  const milliseconds = Number(ms);

  return { hours, minutes, seconds, milliseconds };
};

export const generateSrtFile = (srtBlock: SrtBlock[]): string => {
  let result = "";
  for (let i = 0; i < srtBlock.length; i++) {
    const { id, start, end, subtitle } = srtBlock[i];
    const startTime = `${start.hours
      .toString()
      .padStart(2, "0")}:${start.minutes
      .toString()
      .padStart(2, "0")}:${start.seconds
      .toString()
      .padStart(2, "0")},${start.milliseconds.toString().padStart(3, "0")}`;
    const endTime = `${end.hours.toString().padStart(2, "0")}:${end.minutes
      .toString()
      .padStart(2, "0")}:${end.seconds
      .toString()
      .padStart(2, "0")},${end.milliseconds.toString().padStart(3, "0")}`;
    result += `${id}\n${startTime} --> ${endTime}\n${subtitle}\n\n`;
  }
  return result;
};
