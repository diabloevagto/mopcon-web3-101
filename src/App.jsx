import { useEffect } from "react";
import { useConnect, useAccount, useDisconnect, useSwitchNetwork } from "wagmi";

import SendTransaction from "./SendTransaction";

import "./App.css";

function App() {
  const { connect, connectors, error } = useConnect();
  const { disconnect } = useDisconnect();
  const { address, isConnected } = useAccount();
  const { chains, switchNetwork } = useSwitchNetwork();

  useEffect(() => {
    if (isConnected && switchNetwork) {
      switchNetwork(chains[0].id);
    }
  }, [isConnected, switchNetwork]);

  return (
    <div className="App">
      <h1>Blockchain + React</h1>
      <div className="card">
        {isConnected ? (
          <>
            <p>{address}</p>
            <button onClick={disconnect}>Disconnect</button>
            <SendTransaction />
          </>
        ) : (
          connectors.map((connector) => (
            <button key={connector.id} onClick={() => connect({ connector })}>
              {connector.name}
            </button>
          ))
        )}

        {error && <p>{error.message}</p>}
      </div>
    </div>
  );
}

export default App;
