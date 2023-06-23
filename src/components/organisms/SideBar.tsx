import { memo } from "react";
import { Header, Icon, Image, Menu, Segment, Sidebar } from "semantic-ui-react";

import { TitleHeader } from "../organisms/TitleHeader";
import { Task } from "../../types/Task";

type Props = {
  tasks: Task[];
  activeIndex: number;
  onItemClick: React.Dispatch<React.SetStateAction<number>>;
};

export const SideBar: React.VFC<Props> = memo(
  ({ tasks, activeIndex, onItemClick }) => {
    return (
      <div style={{ padding: 10 }}>
        <TitleHeader />
        <Menu
          secondary
          vertical
          inverted
          fluid
          style={{ margin: 0, textAlign: "left" }}
        >
          <Menu.Item
            as="a"
            style={{
              border: "0.5px solid gray",
              padding: "20px",
              margin: "20px 0",
            }}
            active={activeIndex === -1}
            onClick={() => {
              onItemClick(-1);
            }}
          >
            <Icon
              name="plus"
              onClick={() => {
                console.log("plus");
              }}
            />
            音声をアップロード
          </Menu.Item>
          {tasks.map((task, index) => (
            <Menu.Item
              as="a"
              active={activeIndex === index}
              onClick={() => {
                onItemClick(index);
              }}
            >
              <Icon
                name="trash"
                onClick={() => {
                  console.log("trash");
                }}
              />
              <Icon
                name="redo"
                onClick={() => {
                  console.log("redo");
                }}
              />
              {task.title}
            </Menu.Item>
          ))}
        </Menu>
      </div>
    );
  }
);
