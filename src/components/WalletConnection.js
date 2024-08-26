import React, { useState } from 'react';
import Web3 from 'web3';
import styled from 'styled-components';

const ConnectionScreen = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-color: #121212;
`;

const ConnectButton = styled.button`
  padding: 12px 24px;
  font-size: 18px;
  color: white;
  background: linear-gradient(90deg, #6a11cb, #2575fc);
  border: none;
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    opacity: 0.8;
  }
`;

const ErrorMessage = styled.p`
  color: red;
  margin-top: 16px;
`;

const WalletConnection = ({ onConnect }) => {
  const [error, setError] = useState("");

  const connectWallet = async () => {
    if (typeof window.ethereum !== 'undefined') {
      try {
        const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });

        // Validate the connected address
        if (Web3.utils.isAddress(accounts[0])) {
          const web3 = new Web3(window.ethereum);
          onConnect(web3, accounts[0]);  // Pass the Web3 instance and wallet address to the parent component
        } else {
          throw new Error("Invalid Ethereum address.");
        }
      } catch (err) {
        if (err.code === 4001) {
          // User rejected the connection request
          setError("Connection request rejected by the user.");
        } else if (err.message.includes("Invalid Ethereum address")) {
          setError("Connected wallet address is invalid.");
        } else {
          setError("Can't connect. Please try again.");
        }
      }
    } else {
      setError("MetaMask not detected. Please install MetaMask.");
    }
  };

  return (
    <ConnectionScreen>
      <div>
        <ConnectButton onClick={connectWallet}>Connect Wallet</ConnectButton>
        {error && <ErrorMessage>{error}</ErrorMessage>}
      </div>
    </ConnectionScreen>
  );
};

export default WalletConnection;
