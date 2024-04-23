import { BrowserRouter } from "react-router-dom";
import { Routes } from "./components/routes/Routes";
import { Provider } from "react-redux";
import { store } from "./store/store";
import { ProviderWrapper } from "./ProviderWrapper";

function App() {
  return (
    <ProviderWrapper>
      <Routes />
    </ProviderWrapper>
  );
}

export default App;
