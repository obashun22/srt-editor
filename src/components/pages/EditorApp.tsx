import {
  Container,
  Dimmer,
  Grid,
  Icon,
  Loader,
  Menu,
  Segment,
} from "semantic-ui-react";
import * as CSS from "csstype";
import { UploadPanel } from "../molcules/UploadPanel";
import { memo, useCallback, useContext, useState } from "react";
import { SRTEditPanel } from "../molcules/SRTEditPanel";
import { SrtBlock } from "../../types/Srt";
import { parseSrtFile, generateSrtString } from "../../utils/Srt";
import { AudioContext } from "../../providers/AudioPlovider";
import { ApiClient } from "../../api/ApiClient";
import { SideBar } from "../organisms/SideBar";
import { UploadPage } from "./UploadPage";
import { EditorPage } from "./EditorPage";
import { Task } from "../../types/Task";
import { QABlock } from "../../types/QA";

const apiClient = new ApiClient();

const sampleTask = {
  id: 0,
  title: "人工知能基礎１ ニューラルネットワーク",
  srtBlocks: [
    {
      id: 0,
      start: {
        hours: 0,
        minutes: 0,
        seconds: 0,
        milliseconds: 0,
      },
      end: {
        hours: 0,
        minutes: 0,
        seconds: 12,
        milliseconds: 0,
      },
      subtitle: "Hello, World!",
    },
  ] as SrtBlock[],
  qaBlocks: [
    {
      id: 0,
      question: "Hello, World!とは何ですか？",
      answer: "プログラミング言語のHello, World!という出力のことです。",
    },
    {
      id: 1,
      question: "hogeとは何ですか？",
      answer: "hogeはfugaです。",
    },
  ] as QABlock[],
} as Task;
const sampleTasks = [
  sampleTask,
  { ...sampleTask, id: 1, title: "文化人類学基礎 概説" },
  { ...sampleTask, id: 2, title: "量子力学入門講座 シュレディンガー方程式" },
];

export const EditorApp = memo(() => {
  const [srtFile, setSrtFile] = useState<File | null>(null);
  const [srtBlocks, setsrtBlocks] = useState<SrtBlock[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [audioFile, setAudioFile] = useState<File | null>(null);

  const [pageIndex, setPageIndex] = useState<number>(2); // -1: UploadPage, others: EditorPage
  const [tasks, setTasks] = useState<Task[]>(sampleTasks);

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
                            setsrtBlocks(data);
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
                  }, 3000);
                } else {
                  console.log(res);
                  alert("SRTファイルのアップロードに失敗しました。");
                  setAudioFile(null);
                  audioPlayer.src = "";
                  setLoading(false);
                }
              })
              .catch((e) => {
                console.log(e);
                alert("SRTファイルのアップロードに失敗しました。");
                setAudioFile(null);
                audioPlayer.src = "";
                setLoading(false);
              });
            break;
          default:
            srt = uploadFile;
            setSrtFile(srt);
            parseSrtFile(srt)
              .then((data) => {
                setsrtBlocks(data);
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
    [setLoading, setsrtBlocks, setSrtFile, setAudioFile, audioPlayer]
  );

  const handleQuitButtonClick = useCallback(() => {
    const willQuit = window.confirm("編集中の内容は破棄されます。");
    if (willQuit) {
      audioPlayer.pause();
      setSrtFile(null);
      setsrtBlocks([]);
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
            setsrtBlocks(data);
          })
          .catch((err) => {
            console.log(err);
          });
      }
    }
  }, [srtFile, setsrtBlocks, audioPlayer]);

  const handleDownloadButtonClick = useCallback(() => {
    const willDownload = window.confirm("編集中の内容をダウンロードします。");
    if (willDownload) {
      const srtStr = generateSrtString(srtBlocks);
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
  }, [srtBlocks]);

  const handleTaskChange = useCallback(
    (newTask: Task) => {
      setTasks((prevTasks) => {
        let newTasks = [...prevTasks];
        newTasks[pageIndex] = newTask;
        return newTasks;
      });
    },
    [pageIndex]
  );

  return (
    <>
      <div style={pageLayout}>
        <div style={sideBarStyle}>
          <SideBar
            tasks={tasks}
            activeIndex={pageIndex}
            onItemClick={setPageIndex}
          />
        </div>
        <div style={contentStyle}>
          {pageIndex === -1 ? (
            // アップロードページ
            <>
              <div>index {pageIndex}</div>
              <UploadPage onUpload={handleFileInputChange} />
            </>
          ) : (
            // エディタページ
            <div style={{ paddingTop: 40 }}>
              {/* <div>pageIndex {pageIndex}</div>
              <div>taskIndex {tasks[pageIndex].id}</div> */}
              <EditorPage
                loading={loading}
                task={tasks[pageIndex]}
                onTaskChange={handleTaskChange}
                onQuit={handleQuitButtonClick}
                onReset={handleResetButtonClick}
                onDownload={handleDownloadButtonClick}
              />
            </div>
          )}
        </div>
      </div>
    </>
  );
});

const pageLayout = {
  display: "flex",
};

const sideBarStyle = {
  flexGrow: 0,
  flexShrink: 0,
  width: "300px",
  height: "100vh",
  backgroundColor: "#1d1d1d",
};

const contentStyle: CSS.Properties = {
  flexGrow: 1,
  flexShrink: 1,
  height: "100vh",
  padding: "0 20px",
  textAlign: "center",
};

/*

SRTEditor SrtBlock[]
↓
EditPanel SrtBlock
↓
DigitInput number

*/
