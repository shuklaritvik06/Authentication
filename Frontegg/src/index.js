import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { FronteggProvider } from "@frontegg/react";

const contextOptions = {
  baseUrl: "https://app-4uvwcidjq8cd.frontegg.com",

  clientId: "26714c1b-4f25-48ae-95c4-2c17a06dbfe2",
};

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <FronteggProvider contextOptions={contextOptions} hostedLoginBox={true}>
    <App />
  </FronteggProvider>
);
