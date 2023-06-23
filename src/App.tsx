import "./App.css";
import "semantic-ui-css/semantic.min.css";
import { EditorApp } from "./components/pages/EditorApp";
import { AudioProvider } from "./providers/AudioPlovider";

function App() {
  return (
    <div className="App">
      <AudioProvider>
        <EditorApp />
      </AudioProvider>
    </div>
  );
}

export default App;
