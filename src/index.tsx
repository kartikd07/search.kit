import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { withSearchkit, withSearchkitRouting } from "@searchkit/client";

const SearchkitApp = withSearchkit(withSearchkitRouting(App));

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <React.StrictMode>
    <SearchkitApp />
  </React.StrictMode>
);
