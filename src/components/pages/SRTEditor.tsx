import { Container, Dimmer, Loader, Menu, Segment } from "semantic-ui-react";
import { TitleHeader } from "../organisms/TitleHeader";
import { UploadPanel } from "../molcules/UploadPanel";
import { memo, useCallback, useContext, useState } from "react";
import { EditPanel } from "../molcules/EditPanel";
import { SrtBlock } from "../../types/Srt";
import { parseSrtFile, generateSrtString } from "../../utils/Srt";
import { AudioContext } from "../../providers/AudioPlovider";
import { AudioUploadPanel } from "../molcules/AudioUploadPanel";
import { ApiClient } from "../../api/ApiClient";

const apiClient = new ApiClient();

export const SRTEditor = memo(() => {
  const [srtFile, setSrtFile] = useState<File | null>(null);
  const [srtData, setSrtData] = useState<SrtBlock[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [audioFile, setAudioFile] = useState<File | null>(null);

  const audioPlayer = useContext(AudioContext);

  const handleFileInputChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      if (e.target.files) {
        setLoading(true);
        // if ファイルが音声 then APIに問い合わせ
        const uploadFile = e.target.files[0];
        console.log(uploadFile);
        let srt: File | null = null;
        switch (uploadFile.type) {
          case "audio/mpeg":
          case "audio/mp3":
          case "audio/wav":
          case "audio/ogg":
          case "audio/aac":
            setAudioFile(uploadFile);
            audioPlayer.src = URL.createObjectURL(e.target.files[0]);
            // APIを叩いてSRTを取得
            apiClient
              .translateToSrt(uploadFile)
              .then((res) => {
                if (res.status === 200) {
                  const intervalId = setInterval(() => {
                    apiClient.getSrt().then((res) => {
                      if (res.status === 200) {
                        clearInterval(intervalId);
                        srt = new File([res.data], "output.srt", {
                          type: "text/plain",
                        });
                        setSrtFile(srt);
                        parseSrtFile(srt)
                          .then((data) => {
                            setSrtData(data);
                          })
                          .catch((e) => {
                            console.log(e);
                            alert("SRTファイルのパースに失敗しました。");
                            setSrtFile(null);
                            setAudioFile(null);
                            audioPlayer.src = "";
                          })
                          .finally(() => {
                            setLoading(false);
                          });
                      } else {
                        return;
                      }
                    });
                  }, 1000);
                } else {
                  console.log(res);
                  alert("SRTファイルのアップロードに失敗しました。");
                  setAudioFile(null);
                  audioPlayer.src = "";
                }
              })
              .catch((e) => {
                console.log(e);
                alert("SRTファイルのアップロードに失敗しました。");
                setAudioFile(null);
                audioPlayer.src = "";
              })
              .finally(() => {
                setLoading(false);
              });
            break;
          default:
            srt = uploadFile;
            setSrtFile(srt);
            parseSrtFile(srt)
              .then((data) => {
                setSrtData(data);
              })
              .catch((err) => {
                console.log(err);
                alert("SRTファイルのパースに失敗しました。");
                setSrtFile(null);
              })
              .finally(() => {
                setLoading(false);
              });
            break;
        }
      }
    },
    [setLoading, setSrtData, setSrtFile, setAudioFile, audioPlayer]
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
          default:
            alert("音声ファイルを選択してください。");
            break;
        }
      }
    },
    [setAudioFile, audioPlayer]
  );

  const handleQuitButtonClick = useCallback(() => {
    const willQuit = window.confirm("編集中の内容は破棄されます。");
    if (willQuit) {
      audioPlayer.pause();
      setSrtFile(null);
      setSrtData([]);
      setAudioFile(null);
      audioPlayer.src = "";
    }
  }, [setSrtFile, setAudioFile, audioPlayer]);

  const handleResetButtonClick = useCallback(() => {
    const willReset = window.confirm("編集中の内容は破棄されます。");
    if (willReset) {
      audioPlayer.pause();
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
  }, [srtFile, setSrtData, audioPlayer]);

  const handleDownloadButtonClick = useCallback(() => {
    const willDownload = window.confirm("編集中の内容をダウンロードします。");
    if (willDownload) {
      const srtStr = generateSrtString(srtData);
      const blob = new Blob([srtStr], { type: "text/plain" });
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = "output.srt";
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
        {!audioFile && srtFile && (
          <AudioUploadPanel onChange={handleAudioFileInputChange} />
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
