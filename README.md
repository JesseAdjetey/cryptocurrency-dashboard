# Cryptocurrency Price Tracker

This is a React-based cryptocurrency price tracker that fetches and displays the latest prices and historical data for various cryptocurrencies. The application integrates with Chainlink and Web3 for decentralized data fetching and uses the CoinGecko API to fetch market data. The app also supports MetaMask for Ethereum-based interactions.

## Features

- **Cryptocurrency Price Tracking**: Fetches and displays real-time prices for major cryptocurrencies including Bitcoin, Ethereum, Cardano, Polkadot, Litecoin, Ripple, Chainlink, and more.
- **Historical Data Visualization**: Displays price trends over customizable time ranges using line charts powered by Chart.js.
- **Top Trading Pairs**: Displays the top trading pairs from various exchanges based on volume.
- **MetaMask Integration**: Connects with MetaMask to check for wallet connection.
- **Chainlink Price Feeds**: Fetches price data using Chainlink decentralized oracles for reliable and decentralized data.

## Tech Stack

- **React**: The frontend framework for building the user interface.
- **Web3.js**: For Ethereum interactions and connecting to the blockchain.
- **Chainlink Plugin**: Used to fetch decentralized price data.
- **CoinGecko API**: Fetches market and price data for cryptocurrencies.
- **Chart.js**: Used for rendering line charts of historical price data.
- **Lodash**: Utility library for debouncing API calls.
- **Axios**: For making HTTP requests to external APIs.

## How to Run

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/crypto-price-tracker.git
