import { Web3ReactProvider } from "@web3-react/core";
import Header from "./components/Header";
import Home from "./pages/Home";
import { getLibrary } from "./functions";
function App() {
  return (
    <Web3ReactProvider getLibrary={getLibrary}>
      <div className="App">
        <Header />
        <Home />
      </div>
    </Web3ReactProvider>
  );
}

export default App;
