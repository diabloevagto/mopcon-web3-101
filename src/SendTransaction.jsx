import { useState } from "react";
import {
  usePrepareSendTransaction,
  useSendTransaction,
  useWaitForTransaction,
} from "wagmi";
import { utils } from "ethers";

function SendTransaction() {
  const [to, setTo] = useState("");
  const [amount, setAmount] = useState("");

  const { config, error, isError } = usePrepareSendTransaction({
    request: {
      to: to,
      value:
        isNaN(amount) || amount === "" ? undefined : utils.parseEther(amount),
    },
  });

  return (
    <>
      <form
        style={{
          margin: "3rem 0px",
          display: "flex",
          flexDirection: "column",
        }}
        onSubmit={(e) => {
          e.preventDefault();
        }}
      >
        <label htmlFor="recipient">Recipient</label>
        <input
          htmlFor="recipient"
          onChange={(e) => setTo(e.target.value)}
          placeholder="0xA0Cf…251e"
          value={to}
        />
        <label htmlFor="amount">Amount</label>
        <input
          htmlFor="amount"
          onChange={(e) => setAmount(e.target.value)}
          placeholder="0.05"
          value={amount}
        />
        <button disabled={!to || !amount || isError}>Send</button>
      </form>

      {error && <p>{error.message}</p>}
    </>
  );
}

export default SendTransaction;
