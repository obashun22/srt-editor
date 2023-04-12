import React from "react";
import "./App.css";
import "semantic-ui-css/semantic.min.css";
import { TitleHeader } from "./components/organisms/TitleHeader";
import {
  Container,
  Form,
  Grid,
  Input,
  Menu,
  Header,
  Segment,
  TextArea,
  Button,
  Icon,
} from "semantic-ui-react";
import { EditPanel } from "./components/molcules/EditPanel";
import { UploadPanel } from "./components/molcules/UploadPanel";

function App() {
  return (
    <div className="App">
      <TitleHeader />
      <Container>
        {/* <div className="my-6">
          <Menu>
            <Menu.Item link>終了</Menu.Item>
            <Menu.Menu position="right" link>
              <Menu.Item link>リセット</Menu.Item>
              <Menu.Item link>ダウンロード</Menu.Item>
            </Menu.Menu>
          </Menu>
        </div>
        <div className="my-8 overflow-y-scroll" style={{ height: "80vh" }}>
          <div className="py-2">
            <EditPanel />
          </div>
          <div className="py-2">
            <EditPanel />
          </div>
          <div className="py-2">
            <EditPanel />
          </div>
        </div> */}
        <div className="mt-16">
          <UploadPanel />
        </div>
      </Container>
    </div>
  );
}

export default App;
