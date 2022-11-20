import symfonyLogo from "./lib/assets/symfony.svg";
import "./App.css";
import { List } from "./List";
import { SymfonyWebDebugToolbar } from "./lib/SymfonyWebDebugToolbar";

function App() {
  return (
    <div className="App">
      <div>
        <a href="https://symfony.com" target="_blank">
          <img src={symfonyLogo} className="logo symfony" alt="Symfony logo" />
        </a>
      </div>
      <h1>Hello Symfony</h1>
      <h2>
        This is a list coming from{" "}
        <a href="https://127.0.0.1:8000/list">https://127.0.0.1:8000/list</a>
      </h2>
      <div className="card">
        <List />
        <p>
          Check the React Symfony Debug Toolbar in the lower right corner for
          details.
        </p>
      </div>
      <SymfonyWebDebugToolbar />
    </div>
  );
}

export default App;
