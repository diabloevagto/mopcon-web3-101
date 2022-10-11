import { useConnect, useAccount, useDisconnect } from "wagmi";

import "./App.css";

function App() {
  const { connect, connectors, error } = useConnect();
  const { disconnect } = useDisconnect();
  const { address, isConnected } = useAccount();

  return (
    <div className="App">
      <h1>Blockchain + React</h1>
      <div className="card">
        {isConnected ? (
          <>
            <p>{address}</p>
            <button onClick={disconnect}>Disconnect</button>
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
