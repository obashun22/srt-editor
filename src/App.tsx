import React from "react";
import "./App.css";
import "semantic-ui-css/semantic.min.css";
import { Header } from "./components/organisms/Header";
import {
  Container,
  Form,
  Grid,
  Input,
  Segment,
  TextArea,
} from "semantic-ui-react";
import { EditPanel } from "./components/molcules/EditPanel";

function App() {
  return (
    <div className="App">
      <Header />
      <Container text>
        <div className="container mx-auto">
          <EditPanel />
        </div>
      </Container>
    </div>
  );
}

export default App;
