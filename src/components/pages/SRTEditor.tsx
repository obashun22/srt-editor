import { Container, Input, Menu } from "semantic-ui-react";
import { TitleHeader } from "../organisms/TitleHeader";
import { UploadPanel } from "../molcules/UploadPanel";
import { useState } from "react";
import { EditPanel } from "../molcules/EditPanel";
import { SrtBlock } from "../../types/Srt";
import { parseSrtFile } from "../../utility/Srt";

export const SRTEditor = () => {
  const [srtFile, setSrtFile] = useState<File | null>(null);
  const [srtData, setSrtData] = useState<SrtBlock[]>([]);

  const handleFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
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
  };

  const handleQuitButtonClick = () => {
    // const willQuit = window.confirm("編集中の内容は破棄されます。");
    const willQuit = true;
    if (willQuit) {
      setSrtFile(null);
    }
  };

  const handleResetButtonClick = () => {
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
  };

  const handleDownloadButtonClick = () => {
    console.log("download");
  };

  const handleSrtBlockChange = (newSrtBlock: SrtBlock) => {
    let newSrtData = structuredClone(srtData); // Deep copy
    newSrtData[newSrtBlock.id - 1] = newSrtBlock;
    setSrtData(newSrtData);
  };

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
                <Menu.Menu position="right" link>
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
};
