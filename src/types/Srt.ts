export type SrtBlock = {
  id: number;
  start: {
    hours: number;
    minutes: number;
    seconds: number;
    milliseconds: number;
  };
  end: {
    hours: number;
    minutes: number;
    seconds: number;
    milliseconds: number;
  };
  subtitle: string;
};
