import React, { useState } from "react";
import { ethers } from "ethers";
import { useBalance, useGasPrice } from "eth-hooks";

import { Transactor } from "../helpers";

function FaucetHint({ localProvider, targetNetwork, address }) {
  const [faucetClicked, setFaucetClicked] = useState(false);

  // fetch local balance
  const yourLocalBalance = useBalance(localProvider, address);

  // get gas Price from network
  const gasPrice = useGasPrice(targetNetwork, "fast");

  // Faucet Tx can be used to send funds from the faucet
  const faucetTx = Transactor(localProvider, gasPrice);

  let faucetHint = "";

  if (
    !faucetClicked &&
    localProvider &&
    localProvider._network &&
    localProvider._network.chainId === 31337 &&
    yourLocalBalance &&
    ethers.utils.formatEther(yourLocalBalance) <= 0
  ) {
    faucetHint = (
      <button
        type="button"
        className="pointer-events-auto bg-teal-400 inline-flex items-center px-4 py-2 shadow-sm text-sm font-medium rounded-md text-teal-900 bg-white hover:bg-teal-300"
        onClick={() => {
          faucetTx({
            to: address,
            value: ethers.utils.parseEther("0.01"),
          });
          setFaucetClicked(true);
        }}
      >
        💰 Grab funds from the faucet ⛽️
      </button>
    );
  }

  return faucetHint;
}

export default FaucetHint;
