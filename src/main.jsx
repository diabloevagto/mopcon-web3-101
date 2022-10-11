import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";

import { chain, WagmiConfig, createClient } from "wagmi";
import { InjectedConnector } from "wagmi/connectors/injected";

// Set up client
const client = createClient({
  autoConnect: true,
  connectors: [
    new InjectedConnector({
      chains: [chain.goerli],
      options: {
        name: "Injected",
      },
    }),
  ],
});

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <WagmiConfig client={client}>
      <App />
    </WagmiConfig>
  </React.StrictMode>
);
