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

2. Navigate to the project directory:
   ```bash
   cd crypto-price-tracker

3. Install dependencies:
   ```bash
   npm install

4. Start the development server:
   ```bash
   npm start

The application will be available at http://localhost:3000/

## Deployed Application
The application is deployed on Fleek and can be accessed at:

https://cryptocurrency-dashboard.on-fleek.app/

(On some browsers, such as Edge, the site might be reported as unsafe. Click on 'More information' and then 'continue to the unsafe site(not recommended)' to access it.)

## Usage
1. Connect your MetaMask wallet to check for Ethereum-based interactions.
2. Choose a cryptocurrency from the dropdown menu to track.
3. Select the desired time range (e.g., 30 days, 3 months, 1 year) to view historical price data.
4. The current price is displayed alongside a line chart showing the price trend over the selected time range.

## Important Functions
**fetchCurrentPrice()**:

Fetches the current price of the selected cryptocurrency from the appropriate source, either through Chainlink or CoinGecko.

**fetchHistoricalData()**:

Fetches and formats historical price data based on the selected cryptocurrency and time range.

**handleMetaMaskConnection()**:

Handles connection to MetaMask for Ethereum-based transactions and data fetching.

**fetchTopPairs()**:

Fetches the top trading pairs for the selected cryptocurrency from decentralized exchanges like Uniswap.

## Dependencies
- React
- Web3.js
- Chainlink Plugin
- CoinGecko API
- Chart.js
- Lodash
- Axios

## Future Enhancements
- Add support for more decentralized data sources.
- Implement live updating prices using WebSockets.
- Expand to include more chart types and indicators (e.g., candlestick charts, moving averages).
- Add user authentication and portfolio tracking features.

## Contributions
Contributions are welcome! Feel free to open an issue or submit a pull request.

## Authors
- Jesse Adjetey - JesseAdjetey


