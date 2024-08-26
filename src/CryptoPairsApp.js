import React, { useState, useEffect } from 'react';
import './App.css';
import axios from 'axios';
import Web3 from 'web3';
import { ChainlinkPlugin, MainnetPriceFeeds } from '@chainsafe/web3-plugin-chainlink';
import { Line } from 'react-chartjs-2';
import 'chart.js/auto'; // Import Chart.js modules

function CryptoPairsApp() {
  const [cryptoPair, setCryptoPair] = useState('btc-usd');
  const [timeRange, setTimeRange] = useState('30d');
  const [chartData, setChartData] = useState({ labels: [], datasets: [] });
  const [currentPrice, setCurrentPrice] = useState(null);
  const [error, setError] = useState('');
  

  // Initialize RPC/injected provider
  // const web3 = new Web3(window.ethereum);

  // // Register the Chainlink plugin
  // web3.registerPlugin(new ChainlinkPlugin());

  const cryptoPairs = [
    { label: 'BTC/USD', value: 'btc-usd' },
    { label: 'ETH/USD', value: 'eth-usd' },
    { label: 'BTC/ETH', value: 'btc-eth' },
    { label: 'BNB/USDT', value: 'bnb-usdt' },
    { label: 'XRP/USDT', value: 'xrp-usdt' },
  ];

  useEffect(() => {
    fetchHistoricalData();
    fetchCurrentPrice();
  }, [cryptoPair, timeRange]);

  const fetchHistoricalData = async () => {
    try {
      const apiUrl = `https://api.coingecko.com/api/v3/coins/markets`;
      const params = {
        vs_currency: 'usd',
        days: timeRange === '30d' ? 30 : parseInt(timeRange, 10) / 30,
      };

      const response = await axios.get(apiUrl, { params });
      const historicalData = response.data.prices.map(([timestamp, price]) => ({
        date: new Date(timestamp).toLocaleDateString(),
        price: price.toFixed(2),
      }));

      formatChartData(historicalData);
    } catch (error) {
      console.error('Error fetching historical data:', error);
      setError('Failed to fetch historical data.');
    }
  };

  const fetchCurrentPrice = async () => {
    try {
      const pairMapping = {
        'btc-usd': 'bitcoin',
        'eth-usd': 'ethereum',
        'btc-eth': 'ethereum', // Adjusted to a matching crypto for demo
        'bnb-usdt': 'binancecoin',
        'xrp-usdt': 'ripple',
      };

      const selectedCrypto = pairMapping[cryptoPair];

      const response = await axios.get(
        `https://api.coingecko.com/api/v3/simple/price`,
        {
          params: {
            ids: selectedCrypto,
            vs_currencies: 'usd',
          },
        }
      );

      const priceInUsd = response.data[selectedCrypto].usd.toFixed(2);
      setCurrentPrice(priceInUsd);
    } catch (error) {
      console.error('Error fetching current price:', error);
      setError('Failed to fetch current price.');
    }
  };
 

 


const formatChartData = (historicalData) => {
  const labels = historicalData.map((entry) => entry.date);
  const prices = historicalData.map((entry) => entry.price);

  setChartData({
    labels,
    datasets: [
      {
        label: `Price (${cryptoPair.toUpperCase()})`,
        data: prices,
        borderColor: 'rgba(75, 192, 192, 1)',
        backgroundColor: 'rgba(75, 192, 192, 0.2)',
        fill: true,
      },
    ],
  });
};

  return (
    <div className="App">
      <header className="App-header">
        <h1>Cryptocurrency Pairs Prices ✅</h1>

        <div className="selector-container">
          <label htmlFor="pair">Cryptocurrency Pair:</label>
          <select
            id="pair"
            value={cryptoPair}
            onChange={(e) => setCryptoPair(e.target.value)}
          >
            {cryptoPairs.map((pair) => (
            <option key={pair.value} value={pair.value}>
              {pair.label}
            </option>
          ))}
        </select>
          <label htmlFor="time">Time Range:</label>
          <select
            id="time"
            value={timeRange}
            onChange={(e) => setTimeRange(e.target.value)}
          >
           <option value="30d">Last 30 Days</option>
          <option value="1m">1 Month</option>
          <option value="2m">2 Months</option>
          </select>
        </div>

        {error && <div className="error-message">{error}</div>}

        <div className="current-price">
          {currentPrice !== null ? (
            <p><strong>{cryptoPair.charAt(0).toUpperCase() + cryptoPair.slice(1)}: </strong>${currentPrice}</p>
          ) : (
            <p>Loading current price...</p>
          )}
        </div>

        <div className="chart-container">
          <Line data={chartData} />
        </div>
        <div style={{ textAlign: "center", marginTop: "20px" }}>
  {/* <h6>
    
    Patience is key when facing connection issues. The data will come through shortly.
  </h6> */}
  <p style={{ fontSize: "20px", marginTop: "18px", fontFamily: 'monospace' }}>
  Patience is key when facing connection issues. The data will come through shortly.
  </p>
  <p style={{ fontSize: "12px", marginTop: "0px", fontFamily: 'monospace' }}>
    © TradeHistoryBot 2024
  </p>
</div>
      </header>
    </div>
  );
}

export default CryptoPairsApp;
