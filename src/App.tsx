import "./App.css";
import { SwProvider } from "./services";
import { Main } from "./Main";

function App() {
  return (
    <div className="App" data-testid="app">
      <SwProvider>
        <Main />
      </SwProvider>
    </div>
  );
}

export default App;
