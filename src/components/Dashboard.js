import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';


const DashboardContainer = styled.div`
  padding: 20px;
  background-color: #1b1b2b;
  color: #ffffff;
  flex: 1;
`;

const DashboardCard = styled.div`
  background-color: #29293d;
  padding: 20px;
  margin-bottom: 20px;
  border-radius: 8px;
`;

const Dashboard = ({ web3 }) => {
  const [priceData, setPriceData] = useState([]);
  const [signal, setSignal] = useState("Hold");

  useEffect(() => {
    const fetchPriceData = async () => {
      const contractAddress = "0x..."; // Chainlink Price Feed Contract Address
      const priceFeed = new web3.eth.Contract(
        [
          // Chainlink Price Feed ABI
          {
            "constant": true,
            "inputs": [],
            "name": "latestAnswer",
            "outputs": [{ "name": "", "type": "int256" }],
            "payable": false,
            "stateMutability": "view",
            "type": "function"
          }
        ],
        contractAddress
      );

      const prices = [];
      for (let i = 0; i < 10; i++) {
        const price = await priceFeed.methods.latestAnswer().call();
        prices.push({ time: `T-${10 - i}`, price: price / 100000000 });
      }
      setPriceData(prices);

      // Example trading signal logic:
      const latestPrice = prices[prices.length - 1].price;
      if (latestPrice > 1800) {
        setSignal("Sell");
      } else if (latestPrice < 1600) {
        setSignal("Buy");
      } else {
        setSignal("Hold");
      }
    };

    if (web3) fetchPriceData();
  }, [web3]);

  return (
    <DashboardContainer>
      <DashboardCard>
        <h2>Real-Time Trading Signal: {signal}</h2>
      </DashboardCard>
      <DashboardCard>
        <h3>Price Chart</h3>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={priceData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="time" />
            <YAxis />
            <Tooltip />
            <Line type="monotone" dataKey="price" stroke="#8884d8" />
          </LineChart>
        </ResponsiveContainer>
      </DashboardCard>
    </DashboardContainer>
  );
};

export default Dashboard;
