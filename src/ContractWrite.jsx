import { useMemo, useState } from "react";
import {
  usePrepareContractWrite,
  useContractWrite,
  useWaitForTransaction,
} from "wagmi";
import { utils } from "ethers";

const abi = [
  {
    constant: false,
    inputs: [
      { name: "token", type: "address" },
      { name: "recipients", type: "address[]" },
      { name: "values", type: "uint256[]" },
    ],
    name: "disperseTokenSimple",
    outputs: [],
    payable: false,
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    constant: false,
    inputs: [
      { name: "token", type: "address" },
      { name: "recipients", type: "address[]" },
      { name: "values", type: "uint256[]" },
    ],
    name: "disperseToken",
    outputs: [],
    payable: false,
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    constant: false,
    inputs: [
      { name: "recipients", type: "address[]" },
      { name: "values", type: "uint256[]" },
    ],
    name: "disperseEther",
    outputs: [],
    payable: true,
    stateMutability: "payable",
    type: "function",
  },
];

function ContractWrite() {
  const [text, setText] = useState("");
  const args = useMemo(() => {
    return text.split("\n").reduce(
      (acc, curr) => {
        const add = curr?.split(",")?.[0];
        const amount = curr?.split(",")?.[1] ?? "0";

        acc[0].push(add);
        acc[1].push(
          isNaN(amount) || amount === "" ? undefined : utils.parseEther(amount)
        );

        return acc;
      },
      [[], []]
    );
  }, [text]);

  const { config, error, isError } = usePrepareContractWrite({
    addressOrName: "0xd152f549545093347a162dce210e7293f1452150",
    contractInterface: abi,
    functionName: "disperseEther",
    args,
    overrides: {
      gasLimit: 600000,
      value: args[1].reduce((acc, curr) => curr.add(acc), 0),
    },
  });

  const { write, data } = useContractWrite(config);

  const { isLoading, isSuccess } = useWaitForTransaction({
    hash: data?.hash,
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
          write?.();
        }}
      >
        <label htmlFor="recipient">recipient and amounts</label>
        <textarea
          htmlFor="recipient"
          spellCheck={false}
          cols={60}
          rows={5}
          placeholder="0x314ab97b76e39d63c78d5c86c2daf8eaa306b182,3.141592"
          onChange={(e) => setText(e.target.value)}
        />
        <button disabled={isLoading || isError}>Send</button>
      </form>

      {error && <p>{error.message}</p>}
      {data && isLoading && (
        <>
          <p>{data.hash}</p>
          <p>Loading...</p>
        </>
      )}

      {isSuccess && (
        <div>
          Successfully
          <div>
            <a
              target="_blank"
              href={`https://goerli.etherscan.io/tx/${data?.hash}`}
            >
              Etherscan {data.hash}
            </a>
          </div>
        </div>
      )}
    </>
  );
}

export default ContractWrite;
