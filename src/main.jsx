import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";

import { chain, WagmiConfig, createClient, configureChains } from "wagmi";
import { InjectedConnector } from "wagmi/connectors/injected";
import { publicProvider } from "wagmi/providers/public";

const { chains, provider } = configureChains(
  [chain.goerli],
  [publicProvider()]
);

// Set up client
const client = createClient({
  autoConnect: true,
  connectors: [
    new InjectedConnector({
      chains,
      options: {
        name: "Injected",
      },
    }),
  ],
  provider,
});

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <WagmiConfig client={client}>
      <App />
    </WagmiConfig>
  </React.StrictMode>
);
