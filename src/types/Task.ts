import { SrtBlock } from "./Srt";
import { QABlock } from "./QA";

export type Task = {
  id: number;
  title: string;
  srtBlocks?: SrtBlock[];
  qaBlocks?: QABlock[];
  audioFile?: File;
};
