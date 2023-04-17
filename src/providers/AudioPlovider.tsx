import { createContext } from "react";
import { AudioPlayer } from "../utils/AudioPlayer";

type Props = {
  children: React.ReactNode;
};

export const AudioContext = createContext<AudioPlayer>(new AudioPlayer());
export const AudioProvider: React.FC<Props> = ({ children }) => {
  const audioPlayer = new AudioPlayer();
  return (
    <AudioContext.Provider value={audioPlayer}>
      {children}
    </AudioContext.Provider>
  );
};
