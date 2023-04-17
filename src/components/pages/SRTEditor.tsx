import {
  Button,
  Container,
  Dimmer,
  Header,
  Icon,
  Loader,
  Menu,
  Segment,
} from "semantic-ui-react";
import { TitleHeader } from "../organisms/TitleHeader";
import { UploadPanel } from "../molcules/UploadPanel";
import { memo, useCallback, useEffect, useState } from "react";
import { EditPanel } from "../molcules/EditPanel";
import { SrtBlock } from "../../types/Srt";
import { parseSrtFile, generateSrtString } from "../../utility/Srt";

export const SRTEditor = memo(() => {
  const [srtFile, setSrtFile] = useState<File | null>(null);
  const [srtData, setSrtData] = useState<SrtBlock[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [audioFile, setAudioFile] = useState<File | null>(null);

  const handleFileInputChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      if (e.target.files) {
        setLoading(true);
        // console.log("SRT File: ", e.target.files[0]);
        // // if ファイルが音声 then APIに問い合わせ
        // switch (e.target.files[0].type) {
        //   case "audio/mpeg":
        //   case "audio/mp3":
        //   case "audio/wav":
        //   case "audio/ogg":
        //   case "audio/aac":
        //     setAudioFile(e.target.files[0]);
        //     break;
        // }
        setSrtFile(e.target.files[0]);
        parseSrtFile(e.target.files[0])
          .then((data) => {
            setSrtData(data);
            // console.log("SRT Data: ", data);
          })
          .catch((err) => {
            console.log(err);
          })
          .finally(() => {
            setLoading(false);
          });
      }
    },
    [setLoading]
  );

  const handleAudioFileInputChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      if (e.target.files) {
        switch (e.target.files[0].type) {
          case "audio/mpeg":
          case "audio/mp3":
          case "audio/wav":
          case "audio/ogg":
          case "audio/aac":
            setAudioFile(e.target.files[0]);
            audioPlayer.src = URL.createObjectURL(e.target.files[0]);
            break;
          // 動画ファイルの場合の処理
          default:
            alert("音声ファイルを選択してください。");
            break;
        }
      }
    },
    [setAudioFile]
  );

  const handleQuitButtonClick = useCallback(() => {
    const willQuit = window.confirm("編集中の内容は破棄されます。");
    if (willQuit) {
      setSrtFile(null);
    }
  }, []);

  const handleResetButtonClick = useCallback(() => {
    const willReset = window.confirm("編集中の内容は破棄されます。");
    if (willReset) {
      if (srtFile) {
        parseSrtFile(srtFile)
          .then((data) => {
            setSrtData(data);
          })
          .catch((err) => {
            console.log(err);
          });
      }
    }
  }, [srtFile]);

  const handleDownloadButtonClick = useCallback(() => {
    const willDownload = window.confirm("編集中の内容をダウンロードします。");
    if (willDownload) {
      const srtStr = generateSrtString(srtData);
      const blob = new Blob([srtStr], { type: "text/plain" });
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = "output.txt";
      document.body.appendChild(a); // For Firefox
      a.click();
      a.remove();
      URL.revokeObjectURL(url);
    }
  }, [srtData]);

  const handleSrtBlockChange = useCallback((newSrtBlock: SrtBlock) => {
    setSrtData((prevSrtData) => {
      // 直接stateを参照するとコールバック関数をメモ化できない
      let newSrtData = [...prevSrtData]; // Shallow copy
      newSrtData[newSrtBlock.id - 1] = newSrtBlock; // 値が変更されたblockとsrtDataだけアドレスが変わる
      return newSrtData;
    });
  }, []);

  return (
    <>
      <TitleHeader />
      <Container>
        <Button
          onClick={() => {
            audioPlayer.play();
            console.log(audioPlayer.audio.paused);
            console.log(audioPlayer.currentTime);
          }}
        >
          Play
        </Button>
        <Button
          onClick={() => {
            audioPlayer.pause();
            console.log(audioPlayer.audio.paused);
            console.log(audioPlayer.currentTime);
          }}
        >
          Pause
        </Button>
        <Button
          onClick={() => {
            audioPlayer.seek(5);
            console.log(audioPlayer.audio.paused);
            console.log(audioPlayer.currentTime);
          }}
        >
          Seek
        </Button>
        {!audioFile && (
          <Segment placeholder>
            <Header icon>
              <Icon
                name="file audio"
                style={{ display: "inline-block", marginRight: "20px" }}
              />
              {"or"}
              <Icon
                name="file video"
                style={{ display: "inline-block", marginLeft: "20px" }}
              />
              <p className="mt-6">
                音声または動画ファイルをアップロードしてください。
              </p>
            </Header>
            <input
              className="mx-auto"
              type="file"
              accept=".wav,.mp3,.mp4"
              onChange={handleAudioFileInputChange}
            />
          </Segment>
        )}
        {srtFile ? (
          <>
            <div className="my-6">
              <Menu>
                <Menu.Item link onClick={handleQuitButtonClick}>
                  終了
                </Menu.Item>
                <Menu.Menu position="right">
                  <Menu.Item link onClick={handleResetButtonClick}>
                    リセット
                  </Menu.Item>
                  <Menu.Item link onClick={handleDownloadButtonClick}>
                    ダウンロード
                  </Menu.Item>
                </Menu.Menu>
              </Menu>
            </div>
            <div className="my-8 overflow-y-scroll" style={{ height: "80vh" }}>
              {srtData.map((block) => (
                <div key={block.id} className="py-2">
                  <EditPanel
                    srtBlock={block}
                    onSrtBlockChange={handleSrtBlockChange}
                  />
                </div>
              ))}
            </div>
          </>
        ) : loading ? (
          <div className="my-6">
            <Segment className="h-64">
              <Dimmer active inverted>
                <Loader inverted>読み込み中</Loader>
              </Dimmer>
            </Segment>
          </div>
        ) : (
          <div className="mt-16">
            <UploadPanel onChange={handleFileInputChange} />
          </div>
        )}
      </Container>
    </>
  );
});

/*

SRTEditor SrtBlock[]
↓
EditPanel SrtBlock
↓
DigitInput number

*/

class AudioPlayer {
  audio: HTMLAudioElement;

  constructor() {
    this.audio = document.createElement("audio");
  }
  get src() {
    return this.audio.src;
  }
  set src(src: string) {
    this.audio.src = src;
  }
  get currentTime() {
    return this.audio.currentTime;
  }

  play() {
    this.audio.play();
  }
  pause() {
    this.audio.pause();
  }
  seek(time: number) {
    this.audio.currentTime = time;
  }
}

const audioPlayer = new AudioPlayer();
