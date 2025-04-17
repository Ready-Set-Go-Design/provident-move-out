import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App";
import { HashRouter } from "react-router-dom";
import { Provider } from "react-redux";
import { store } from "./store/store";

const container = document.getElementById("react-target");
if (!container) {
  throw new Error("Root element not found");
}

const root = createRoot(container);
root.render(
  <StrictMode>
    <Provider store={store}>
      <HashRouter>
        <App />
      </HashRouter>
    </Provider>
  </StrictMode>
);
