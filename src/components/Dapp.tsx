import React, { useEffect, useState } from "react";
import { ethers } from "ethers";
import TokenArtifact from "../ABI/Ballot.json";
import contractAddress from "../ABI/contract-address.json";

// Define types for contract address and TokenArtifact
interface ContractAddress {
  Token: string;
}

interface TokenArtifactType {
  abi: ethers.ContractInterface;
}

// Declare the ethereum object on the window
declare global {
  interface Window {
    ethereum?: ethers.providers.ExternalProvider;
  }
}

export const Dapp: React.FC = () => {
  const [chairperson, setChairperson] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [selectedAddress, setSelectedAddress] = useState<string | null>(null);

  const _initializeEthers = async (): Promise<void> => {
    if (window.ethereum) {
      try {
        // ethers connection for the smart contract
        const provider = new ethers.BrowserProvider(window.ethereum);
        const token = new ethers.Contract(
          (contractAddress as ContractAddress).Token,
          TokenArtifact.abi,
          await provider.getSigner(0)
        );
        const newChairperson = await token.chairpersion();
        setChairperson(newChairperson);
        console.log("Token: ", token);
      } catch (error:any) {
        setErrorMessage("Failed to initialize ethers: " + error.message);
        console.error("Failed to initialize ethers", error);
      }
    } else {
      setErrorMessage("MetaMask is not installed!");
      console.error("MetaMask is not installed!");
    }
  };

  // Connects to the smart contract token id (check /contracts/contract-address.json)
  const init = async (): Promise<void> => {
    if (window.ethereum) {
      try {
        const accounts = await window.ethereum.request({
          method: "eth_accounts",
        });
        if (accounts.length > 0) {
          setSelectedAddress(accounts[0]);
          console.log("Already connected account:", accounts[0]);
          await _initializeEthers();
        } else {
          const [newSelectedAddress] = await window.ethereum.request({
            method: "eth_requestAccounts",
          });
          setSelectedAddress(newSelectedAddress);
          console.log("Newly connected account:", newSelectedAddress);
          await _initializeEthers();
        }
      } catch (error) {
        setErrorMessage(
          "User denied account access. Please connect to MetaMask to use this application."
        );
        console.error("User denied account access", error);
      }
    } else {
      setErrorMessage("MetaMask is not installed!");
      console.error("MetaMask is not installed!");
    }
  };

  useEffect(() => {
    // When the page loads, it will initialize the init function
    // that we need to connect the frontend with the smart contract
    init();
  }, []);

  return (
    <div style={{ padding: "3rem 5rem" }}>
      <h1>Voting System</h1>
      {errorMessage && <p style={{ color: "red" }}>{errorMessage}</p>}
      <p>Chair Person: {chairperson}</p>
      {selectedAddress && <p>Connected Address: {selectedAddress}</p>}
    </div>
  );
};
