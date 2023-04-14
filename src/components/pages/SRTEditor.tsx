import { Container, Input, Menu } from "semantic-ui-react";
import { TitleHeader } from "../organisms/TitleHeader";
import { UploadPanel } from "../molcules/UploadPanel";
import { memo, useCallback, useState } from "react";
import { EditPanel } from "../molcules/EditPanel";
import { SrtBlock } from "../../types/Srt";
import { parseSrtFile } from "../../utility/Srt";

export const SRTEditor = memo(() => {
  const [srtFile, setSrtFile] = useState<File | null>(null);
  const [srtData, setSrtData] = useState<SrtBlock[]>([]);

  const handleFileInputChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      if (e.target.files) {
        setSrtFile(e.target.files[0]);
        console.log("SRT File: ", e.target.files[0]);
        parseSrtFile(e.target.files[0])
          .then((data) => {
            setSrtData(data);
            console.log("SRT Data: ", data);
          })
          .catch((err) => {
            console.log(err);
          });
      }
    },
    []
  );

  const handleQuitButtonClick = useCallback(() => {
    // const willQuit = window.confirm("編集中の内容は破棄されます。");
    const willQuit = true;
    if (willQuit) {
      setSrtFile(null);
    }
  }, []);

  const handleResetButtonClick = useCallback(() => {
    // const willReset = window.confirm("編集中の内容は破棄されます。");
    const willReset = true;
    if (willReset) {
      if (srtFile) {
        parseSrtFile(srtFile)
          .then((data) => {
            setSrtData(data);
            console.log(data);
          })
          .catch((err) => {
            console.log(err);
          });
      }
    }
  }, [srtFile]);

  const handleDownloadButtonClick = useCallback(() => {
    console.log("download");
  }, []);

  const handleSrtBlockChange = useCallback((newSrtBlock: SrtBlock) => {
    setSrtData((prevSrtData) => {
      // 直接stateを参照するとコールバック関数をメモ化できない
      let newSrtData = [...prevSrtData]; // Shallow copy
      newSrtData[newSrtBlock.id - 1] = newSrtBlock; // 値が変更されたblockとsrtDataだけアドレスが変わる
      console.log(newSrtBlock);
      return newSrtData;
    });
  }, []);

  return (
    <>
      <TitleHeader />
      <Container>
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
