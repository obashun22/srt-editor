import "./App.css";
import "semantic-ui-css/semantic.min.css";
import { SRTEditor } from "./components/pages/SRTEditor";
import { AudioProvider } from "./providers/AudioPlovider";

function App() {
  return (
    <div className="App">
      <AudioProvider>
        <SRTEditor />
      </AudioProvider>
    </div>
  );
}

export default App;
