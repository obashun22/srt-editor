import {
  Button,
  Dimmer,
  Header,
  Loader,
  Menu,
  Segment,
} from "semantic-ui-react";
import { SRTEditPanel } from "../molcules/SRTEditPanel";
import { SrtBlock } from "../../types/Srt";
import { memo } from "react";
import { Task } from "../../types/Task";
import { TitleHeader } from "../organisms/TitleHeader";
import React from "react";
import { QAEditPanel } from "../molcules/QAEditPanel";

type Props = {
  loading: boolean;
  task: Task;
  onSrtBlockChange: (srtBlock: SrtBlock) => void;
  onQuit: () => void;
  onReset: () => void;
  onDownload: () => void;
};

export const EditorPage: React.VFC<Props> = memo(
  ({ loading, task, onSrtBlockChange, onQuit, onReset, onDownload }) => {
    const [activeItem, setActiveItem] = React.useState<"SRT" | "QA">("SRT");

    const handleItemClick = (e: any, { name }: any) => setActiveItem(name);

    return (
      <>
        <Menu pointing secondary widths={2}>
          <Menu.Item
            name="SRT"
            active={activeItem === "SRT"}
            onClick={handleItemClick}
          />
          <Menu.Item
            name="QA"
            active={activeItem === "QA"}
            onClick={handleItemClick}
          />
        </Menu>
        {activeItem === "SRT" &&
          (loading ? (
            <div className="my-6">
              <Segment className="h-64">
                <Dimmer active inverted>
                  <Loader inverted>読み込み中</Loader>
                </Dimmer>
              </Segment>
            </div>
          ) : (
            <div>
              <div className="my-6">
                <Menu>
                  <Menu.Item header>{task.title}</Menu.Item>
                  <Menu.Menu position="right">
                    <Menu.Item link onClick={onReset}>
                      リセット
                    </Menu.Item>
                    <Menu.Item link onClick={onDownload}>
                      ダウンロード
                    </Menu.Item>
                  </Menu.Menu>
                </Menu>
                {/* <Button color="grey" onClick={onReset} floated="right">
                リセット
              </Button>
              <Button color="blue" onClick={onDownload} floated="right">
                ダウンロード
              </Button> */}
              </div>
              <div
                className="my-8 overflow-y-scroll"
                style={{ height: "80vh" }}
              >
                {task.srtBlocks?.map((block) => (
                  <div key={block.id} className="py-2">
                    <SRTEditPanel
                      srtBlock={block}
                      onSrtBlockChange={onSrtBlockChange}
                    />
                  </div>
                ))}
              </div>
            </div>
          ))}
        {activeItem === "QA" && (
          <div>
            {task.qaBlocks?.map((block) => (
              <div key={block.id} className="py-2">
                <QAEditPanel
                  qaBlock={block}
                  onQABlockChange={() => {
                    console.log("QABlockChange");
                  }}
                />
              </div>
            ))}
          </div>
        )}
      </>
    );
  }
);
