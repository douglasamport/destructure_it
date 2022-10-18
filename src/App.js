import "./App.css";
import Workspace from "./components/Workspace";
import { copy } from "./copy/copy";

function App() {
  return (
    <div className="App">
      <Workspace copy={copy} />
    </div>
  );
}

export default App;
