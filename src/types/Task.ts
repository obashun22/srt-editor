import { SrtBlock } from "./Srt";

export type QABlock = {
  id: number;
  question: string;
  answer: string;
};

export type Task = {
  id: number;
  title: string;
  srtBlocks?: SrtBlock[];
  qaBlocks?: QABlock[];
  audioFile?: File;
};
