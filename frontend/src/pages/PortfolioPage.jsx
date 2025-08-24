// src/pages/PortfolioPage.jsx
import React, { useContext } from 'react';
import { StockContext } from '../context/StockContext';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
} from 'chart.js';
import { motion } from 'framer-motion';
import Navbar from '../components/Navbar';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Tooltip);

const PortfolioPage = () => {
  const { portfolio, history } = useContext(StockContext);

  let totalInvested = 0;
  let currentValue = 0;

  portfolio.forEach((s) => {
    const currentPrice = s.currentPrice || s.avgPrice; // backend-ready
    totalInvested += s.amount * s.avgPrice;
    currentValue += s.amount * currentPrice;
  });

  const totalGainLoss = currentValue - totalInvested;
  const totalGainLossPercent = totalInvested > 0
    ? ((totalGainLoss / totalInvested) * 100).toFixed(2)
    : 0;

  const generateSparklineData = (symbol, priceData) => ({
    labels: ['1', '2', '3', '4', '5'],
    datasets: [
      {
        data: priceData,
        borderColor: '#9d4edd',
        backgroundColor: 'rgba(157,78,221,0.2)',
        tension: 0.3,
        pointRadius: 0,
      },
    ],
  });

  const sparklineOptions = {
    plugins: { legend: { display: false } },
    scales: { x: { display: false }, y: { display: false } },
    elements: { line: { borderWidth: 2 } },
  };

  return (
    <div className="min-h-screen bg-black text-white flex flex-col space-y-6">
      {/* Navbar */}
      <Navbar theme="dark" leftLinks={["Home", "WorkPage", "Portfolio", "Contact"]} />

      <div className="px-8 py-6">
        <h1 className="text-3xl font-bold text-purple-400 mb-4">My Portfolio</h1>

        {/* Portfolio Summary */}
        <motion.div
          className="p-6 bg-gray-900 rounded-lg shadow-lg border border-gray-700 mb-6 hover:shadow-purple-500 transition-shadow duration-300"
          animate={{ scale: [1, 1.02, 1] }}
          transition={{ repeat: Infinity, duration: 5 }}
        >
          <h2 className="text-lg font-semibold mb-2 text-purple-400">Portfolio Summary</h2>
          <p><strong>Total Invested:</strong> ${totalInvested.toFixed(2)}</p>
          <p><strong>Current Value:</strong> ${currentValue.toFixed(2)}</p>
          <p className={`font-semibold ${totalGainLoss >= 0 ? 'text-green-400' : 'text-red-400'}`}>
            <strong>Overall Gain/Loss:</strong> {totalGainLoss >= 0 ? '+' : ''}${totalGainLoss.toFixed(2)} ({totalGainLossPercent}%)
          </p>
        </motion.div>

        {/* Portfolio Table */}
        <div className="overflow-x-auto">
          <table className="table-auto w-full border-collapse border border-gray-700">
            <thead className="bg-gray-800 text-purple-400">
              <tr>
                <th className="border px-4 py-2">Stock</th>
                <th className="border px-4 py-2">Amount</th>
                <th className="border px-4 py-2">Avg Price</th>
                <th className="border px-4 py-2">Current Price</th>
                <th className="border px-4 py-2">Gain/Loss</th>
                <th className="border px-4 py-2">Trend</th>
              </tr>
            </thead>
            <tbody>
              {portfolio.map((s, i) => {
                const currentPrice = s.currentPrice || s.avgPrice;
                const totalSpent = s.amount * s.avgPrice;
                const stockValue = s.amount * currentPrice;
                const gainLoss = stockValue - totalSpent;
                const gainLossPercent = ((gainLoss / totalSpent) * 100).toFixed(2);
                const mockTrend = Array(5).fill().map((_, idx) => s.avgPrice + idx * 2);

                return (
                  <tr key={i} className="even:bg-gray-900 odd:bg-gray-800 hover:bg-purple-950 transition-colors duration-200">
                    <td className="border px-4 py-2">{s.symbol}</td>
                    <td className="border px-4 py-2">{s.amount}</td>
                    <td className="border px-4 py-2">${s.avgPrice}</td>
                    <td className="border px-4 py-2">${currentPrice}</td>
                    <td className={`border px-4 py-2 font-semibold ${gainLoss >= 0 ? 'text-green-400' : 'text-red-400'}`}>
                      {gainLoss >= 0 ? '+' : ''}${gainLoss.toFixed(2)} ({gainLossPercent}%)
                    </td>
                    <td className="border px-4 py-2 w-32 h-12">
                      <Line data={generateSparklineData(s.symbol, mockTrend)} options={sparklineOptions} />
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        {/* Transaction History */}
        <h2 className="text-lg font-semibold text-purple-400 mt-6 mb-2">Transaction History</h2>
        <ul className="space-y-2">
          {history.map((h, i) => (
            <motion.li
              key={i}
              className="p-2 bg-gray-900 rounded shadow hover:shadow-purple-500 transition-shadow duration-300 border border-gray-700"
              whileHover={{ scale: 1.02 }}
            >
              {h.type} {h.amount} {h.symbol} @ ${h.price} on {h.date.toLocaleString()}
            </motion.li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default PortfolioPage;
