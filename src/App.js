import React, { useState, useEffect, useCallback } from 'react';
import './App.css';
import axios from 'axios';
import Web3 from 'web3';
import { ChainlinkPlugin, MainnetPriceFeeds } from '@chainsafe/web3-plugin-chainlink';
import { Line } from 'react-chartjs-2';
import 'chart.js/auto';
import _ from 'lodash';

function App() {
  const [cryptocurrency, setCryptocurrency] = useState('bitcoin');
  const [timeRange, setTimeRange] = useState('30d');
  const [chartData, setChartData] = useState({ labels: [], datasets: [] });
  const [currentPrice, setCurrentPrice] = useState(null);
  const [error, setError] = useState('');
  const [btcPrice, setBtcPrice] = useState("000");
  const [ethPrice, setEthPrice] = useState("000");
  const [adaPrice, setAdaPrice] = useState("000");
  const [dotPrice, setDotPrice] = useState("000");
  const [ltcPrice, setLtcPrice] = useState("000");
  const [xrpPrice, setXrpPrice] = useState("000");
  const [linkPrice, setLinkPrice] = useState("000");
  const [yfiPrice, setYfiPrice] = useState("000");
  const [uniPrice, setUniPrice] = useState("000");
  const [mkrPrice, setMkrPrice] = useState("000");
  const [snxPrice, setSnxPrice] = useState("000");
  const [bchPrice, setBchPrice] = useState("000");
  const [dogePrice, setDogePrice] = useState("000");
  const MemoizedLine = React.memo(Line);
  const [isMetaMaskConnected, setIsMetaMaskConnected] = useState(false);
  const [topPairs, setTopPairs] = useState([]);

  const checkMetaMaskConnection = useCallback(async () => {
    if (typeof window.ethereum !== 'undefined') {
      try {
        await window.ethereum.request({ method: 'eth_requestAccounts' });
        setIsMetaMaskConnected(true);
      } catch (error) {
        console.error("User denied account access");
        setIsMetaMaskConnected(false);
      }
    } else {
      console.log('MetaMask not detected');
      setIsMetaMaskConnected(false);
    }
  }, []);

  useEffect(() => {
    checkMetaMaskConnection();
  }, [checkMetaMaskConnection]);

  const web3 = new Web3(window.ethereum);
  web3.registerPlugin(new ChainlinkPlugin());

  const debouncedFetchData = _.debounce(async () => {
    await Promise.all([fetchHistoricalData(), fetchCurrentPrice(), fetchTopPairs()]);
  }, 500);

  useEffect(() => {
    debouncedFetchData();
    return () => {
      debouncedFetchData.cancel();
    };
  }, [cryptocurrency, timeRange]);

  const fetchTopPairs = async () => {
    try {
      const response = await axios.get('https://api.coingecko.com/api/v3/exchanges');
      const exchanges = response.data;

      const pairs = [];
      for (const exchange of exchanges) {
        if (pairs.length >= 7) break;
        const marketData = await axios.get(`https://api.coingecko.com/api/v3/exchanges/${exchange.id}/tickers`);
        pairs.push(...marketData.data.tickers.slice(0, 7 - pairs.length));
      }

      const sortedPairs = pairs
        .sort((a, b) => b.volume - a.volume)
        .slice(0, 7)
        .map(pair => ({
          name: `${pair.base}/${pair.target}`,
          price: parseFloat(pair.last).toFixed(2),
        }));

      setTopPairs(sortedPairs);
    } catch (error) {
      console.error('Error fetching top trading pairs:', error);
    }
  };

  const navigateToUrl = (url) => {
    window.open(url, '_blank');
  };


  const fetchHistoricalData = async () => {
    try {
      const apiUrl = `https://api.coingecko.com/api/v3/coins/${cryptocurrency}/market_chart`;
      const params = {
        vs_currency: 'usd',
        days: timeRange === '30d' ? 30 :  timeRange === '1m' ? 30 : timeRange === '2m' ? 60 : timeRange === '3m' ? 90 : 
        timeRange === '4m' ? 120 : timeRange === '5m' ? 150 : timeRange === '6m' ? 180 : timeRange === '7m' ? 210 : timeRange === '8m' ? 240 : 
        timeRange === '9m' ? 270 :  timeRange === '10m' ? 300 : timeRange === '11m' ? 330 : timeRange === '1y' ? 365 : parseInt(timeRange, 10) / 30,
      };

      const response = await axios.get(apiUrl, { params });
      const historicalData = response.data.prices.map(([timestamp, price]) => ({
        date: new Date(timestamp).toLocaleDateString(),
        price: price.toFixed(2),
      }));

      formatChartData(historicalData);
    } catch (error) {
      console.error('Error fetching historical data:', error);
    }
  };

  const fetchCurrentPrice = async () => {
    if (!cryptocurrency) return; 
    try {
      switch (cryptocurrency) {
        case 'bitcoin':
          await fetchBitcoinPrice();
          break;
        case 'ethereum':
          await fetchEthereumPrice();
          break;
        case 'cardano':
          await fetchCardanoPrice();
          break;
        case 'polkadot':
          await fetchPolkadotPrice();
          break;
        case 'litecoin':
          await fetchLitecoinPrice();
          break;
        case 'ripple':
          await fetchRipplePrice();
          break;
        case 'chainlink':
          await fetchChainlinkPrice();
          break;
        case 'yearn-finance':
          await fetchYearnFinancePrice();
          break;
        case 'uniswap':
          await fetchUniswapPrice();
          break;
        case 'maker':
          await fetchMakerPrice();
          break;
        case 'synthetix':
          await fetchSynthetixPrice();
          break;
        case 'bitcoin-cash':
          await fetchBitcoinCashPrice();
          break;
        case 'dogecoin':
          await fetchDogecoinPrice();
          break;
        default:
          throw new Error('Unsupported cryptocurrency');
      }
    } catch (error) {
      setError(`Error: ${error.message}`);
      console.error('Error in fetchCurrentPrice:', error);
    }
  };

 

  const fetchBitcoinPrice = async () => {
    try {
        const btcPriceData = await web3.chainlink.getPrice(MainnetPriceFeeds.BtcUsd);
        const priceInUsd = parseFloat(btcPriceData.answer.toString()) / 100000000; // Adjust divisor
        const formattedPrice = priceInUsd.toFixed(2);
        setBtcPrice(formattedPrice);
        setCurrentPrice(formattedPrice);
    } catch (error) {
        console.error('Error fetching Bitcoin price:', error);
    }
};

const fetchEthereumPrice = async () => {
    try {
        const ethPriceData = await web3.chainlink.getPrice(MainnetPriceFeeds.EthUsd);
        const priceInUsd = parseFloat(ethPriceData.answer.toString()) / 100000000; // Adjust divisor
        const formattedPrice = priceInUsd.toFixed(2);
        setEthPrice(formattedPrice);
        setCurrentPrice(formattedPrice);
    } catch (error) {
        console.error('Error fetching Ethereum price:', error);
    }
};

const fetchCardanoPrice = async () => {
  try {
      const response = await axios.get('https://api.coingecko.com/api/v3/simple/price', {
          params: {
              ids: 'cardano',
              vs_currencies: 'usd',
          },
      });
      const priceInUsd = response.data.cardano.usd.toFixed(2);
      setAdaPrice(priceInUsd);
      setCurrentPrice(priceInUsd);
  } catch (error) {
      console.error('Error fetching Cardano price:', error);
  }
};
const fetchPolkadotPrice = async () => {
  try {
      const response = await axios.get('https://api.coingecko.com/api/v3/simple/price', {
          params: {
              ids: 'polkadot',
              vs_currencies: 'usd',
          },
      });
      const priceInUsd = response.data.polkadot.usd.toFixed(2);
      setDotPrice(priceInUsd);
      setCurrentPrice(priceInUsd);
  } catch (error) {
      console.error('Error fetching Polkadot price:', error);
  }
};

const fetchLitecoinPrice = async () => {
  try {
      const response = await axios.get('https://api.coingecko.com/api/v3/simple/price', {
          params: {
              ids: 'litecoin',
              vs_currencies: 'usd',
          },
      });
      const priceInUsd = response.data.litecoin.usd.toFixed(2);
      setLtcPrice(priceInUsd);
      setCurrentPrice(priceInUsd);
  } catch (error) {
      console.error('Error fetching Litecoin price:', error);
  }
};

const fetchRipplePrice = async () => {
  try {
      const response = await axios.get('https://api.coingecko.com/api/v3/simple/price', {
          params: {
              ids: 'ripple',
              vs_currencies: 'usd',
          },
      });
      const priceInUsd = response.data.ripple.usd.toFixed(2);
      setXrpPrice(priceInUsd);
      setCurrentPrice(priceInUsd);
  } catch (error) {
      console.error('Error fetching Ripple price:', error);
  }
};

const fetchChainlinkPrice = async () => {
    try {
        const linkPriceData = await web3.chainlink.getPrice(MainnetPriceFeeds.LinkUsd);
        const priceInUsd = parseFloat(linkPriceData.answer.toString()) / 100000000; // Adjust divisor
        const formattedPrice = priceInUsd.toFixed(2);
        setLinkPrice(formattedPrice);
        setCurrentPrice(formattedPrice);
    } catch (error) {
        console.error('Error fetching Chainlink price:', error);
    }
};

const fetchYearnFinancePrice = async () => {
    try {
        const yfiPriceData = await web3.chainlink.getPrice(MainnetPriceFeeds.YfiUsd);
        const priceInUsd = parseFloat(yfiPriceData.answer.toString()) / 100000000; // Adjust divisor
        const formattedPrice = priceInUsd.toFixed(2);
        setYfiPrice(formattedPrice);
        setCurrentPrice(formattedPrice);
    } catch (error) {
        console.error('Error fetching Yearn Finance price:', error);
    }
};

const fetchUniswapPrice = async () => {
    try {
        const uniPriceData = await web3.chainlink.getPrice(MainnetPriceFeeds.UniUsd);
        const priceInUsd = parseFloat(uniPriceData.answer.toString()) / 100000000; // Adjust divisor
        const formattedPrice = priceInUsd.toFixed(2);
        setUniPrice(formattedPrice);
        setCurrentPrice(formattedPrice);
    } catch (error) {
        console.error('Error fetching Uniswap price:', error);
    }
};

const fetchMakerPrice = async () => {
    try {
        const mkrPriceData = await web3.chainlink.getPrice(MainnetPriceFeeds.MkrUsd);
        const priceInUsd = parseFloat(mkrPriceData.answer.toString()) / 100000000; // Adjust divisor
        const formattedPrice = priceInUsd.toFixed(2);
        setMkrPrice(formattedPrice);
        setCurrentPrice(formattedPrice);
    } catch (error) {
        console.error('Error fetching Maker price:', error);
    }
};

const fetchSynthetixPrice = async () => {
    try {
        const snxPriceData = await web3.chainlink.getPrice(MainnetPriceFeeds.SnxUsd);
        const priceInUsd = parseFloat(snxPriceData.answer.toString()) / 100000000; // Adjust divisor
        const formattedPrice = priceInUsd.toFixed(2);
        setSnxPrice(formattedPrice);
        setCurrentPrice(formattedPrice);
    } catch (error) {
        console.error('Error fetching Synthetix price:', error);
    }
};

const fetchBitcoinCashPrice = async () => {
  try {
      const response = await axios.get('https://api.coingecko.com/api/v3/simple/price', {
          params: {
              ids: 'bitcoin-cash',
              vs_currencies: 'usd',
          },
      });
      const priceInUsd = response.data['bitcoin-cash'].usd.toFixed(2);
      setBchPrice(priceInUsd);
      setCurrentPrice(priceInUsd);
  } catch (error) {
      console.error('Error fetching Bitcoin Cash price:', error);
  }
};

const fetchDogecoinPrice = async () => {
  try {
      const response = await axios.get('https://api.coingecko.com/api/v3/simple/price', {
          params: {
              ids: 'dogecoin',
              vs_currencies: 'usd',
          },
      });
      const priceInUsd = response.data.dogecoin.usd.toFixed(2);
      setDogePrice(priceInUsd);
      setCurrentPrice(priceInUsd);
  } catch (error) {
      console.error('Error fetching Dogecoin price:', error);
  }
};


const formatChartData = (historicalData) => {
  if (!historicalData || historicalData.length === 0) {
    setChartData({ labels: [], datasets: [] });
    return;
  }

  const labels = historicalData.map(item => item.date);
  const prices = historicalData.map(item => item.price);

  setChartData({
    labels: labels,
    datasets: [
      {
        label: `Price of ${cryptocurrency.toUpperCase()}`,
        data: prices,
        fill: false,
        backgroundColor: 'rgba(75,192,192,0.2)',
        borderColor: 'rgba(75,192,192,1)',
      },
    ],
  });
};


  return (
    <div className="App">
      <header className="App-header">
      <h1>
  <span class="color1">Cryptocurrency </span>
  <span class="color2">Dashboard</span>
</h1>

        <div className="selector-container">
          <label htmlFor="cryptocurrency">Cryptocurrency:</label>
          <select
            id="cryptocurrency"
            value={cryptocurrency}
            onChange={(e) => setCryptocurrency(e.target.value)}
          >
            <option value="bitcoin">Bitcoin</option>
            <option value="ethereum">Ethereum</option>
            <option value="chainlink">Chainlink</option>
            <option value="yearn-finance">Yearn.Finance</option>
            <option value="uniswap">Uniswap</option>
            <option value="maker">Maker</option>
            <option value="synthetix">Synthetix</option>
            <option value="bitcoin-cash">Bitcoin Cash</option>
            <option value="dogecoin">Dogecoin</option>
            <option value="cardano">Cardano</option>
            <option value="polkadot">Polkadot</option>
            <option value="litecoin">Litecoin</option>
            <option value="ripple">Ripple</option>
          </select>

          <label htmlFor="timeRange">Time Range:</label>
          <select
            id="timeRange"
            value={timeRange}
            onChange={(e) => setTimeRange(e.target.value)}
          >
            <option value="1m">1 Month</option>
            <option value="2m">2 Months</option>
            <option value="3m">3 Months</option>
            <option value="4m">4 Months</option>
            <option value="5m">5 Months</option>
            <option value="6m">6 Months</option>
            <option value="7m">7 Months</option>
            <option value="8m">8 Months</option>
            <option value="9m">9 Months</option>
            <option value="10m">10 Months</option>
            <option value="11m">11 Months</option>
            <option value="1y">Last 1 Year</option>
          </select>

          
        </div>

        {error && <div className="error-message">{error}</div>}

        <div className="current-price">
          {currentPrice !== null ? (
            <p><strong>{cryptocurrency.charAt(0).toUpperCase() + cryptocurrency.slice(1)}: </strong>${currentPrice}</p>
          ) : (
            <p>Loading current price...</p>
          )}
        </div>

        <div className="chart-container">
        <MemoizedLine data={chartData} />
        </div>
          <div className="top-pairs-container">
        <h3 className="top-pairs-heading">Top Active Pairs</h3>
        <table className="top-pairs-table">
          <thead>
            <tr>
              <th>Pair</th>
              <th>Price (USD)</th>
            </tr>
          </thead>
          <tbody>
            {topPairs.map((pair, index) => (
              <tr key={index}>
                <td>{pair.name}</td>
                <td>{pair.price}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
        <div style={{ textAlign: "center", marginTop: "20px" }}>
  {/* <h6>
    
    Patience is key when facing connection issues. The data will come through shortly.
  </h6> */}

<div className="button-container">
          <button
            className="twitter-button"
            onClick={() => navigateToUrl('https://x.com/_jesseadjetey')}
            aria-label="Twitter"
          >
            <img src="images/twitter.png" alt="twitter.png" onClick={() => navigateToUrl('https://x.com/_jesseadjetey')} /> 
          </button>
          <button
            className="github-button"
          >
             <img src="images/github.png" alt="github.png" onClick={() => navigateToUrl('https://github.com/JesseAdjetey/cryptocurrency-dashboard')} />
          </button>
          <button
            className="instagram-button"
          >
         <img src="images/instagram.png" alt="instagram.png" onClick={() => navigateToUrl('https://instagram.com/_jesseadjetey')} />
          </button>
        </div>

  <p style={{ fontSize: "20px", marginTop: "100px", fontFamily: 'monospace' }}>
  DApp✅ that displays historical data up to a year for several popular cryptocurrencies.
  
  </p>
  <p style={{ fontSize: "20px", marginTop: "-18px", fontFamily: 'monospace' }}>
  Refresh🔃 incase of issues
  </p>

  <p style={{ fontSize: "12px", marginTop: "-8px", fontFamily: 'monospace' }}>
   Made with 🧡 by Jesse Adjetey
  </p>

</div>
      </header>
    </div>


  );
}

export default App;
