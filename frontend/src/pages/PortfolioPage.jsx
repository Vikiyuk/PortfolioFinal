// src/pages/PortfolioPage.jsx
import React, { useContext } from 'react';
import { StockContext } from '../context/StockContext';
import { mockPrices } from '../utils/mockPrices';
import GainLossTable from "../components/GainLossTable";

const PortfolioPage = () => {
  const { portfolio, history } = useContext(StockContext);

  // ===== Calculate Portfolio Summary =====
  let totalInvested = 0;
  let currentValue = 0;

  portfolio.forEach((s) => {
    const currentPrice = mockPrices[s.symbol] || s.avgPrice;
    totalInvested += s.amount * s.avgPrice;
    currentValue += s.amount * currentPrice;
  });

  const totalGainLoss = currentValue - totalInvested;
  const totalGainLossPercent = totalInvested > 0 
    ? ((totalGainLoss / totalInvested) * 100).toFixed(2) 
    : 0;

  return (
    <div className="p-4">
      <h1 className="text-xl font-bold mb-6">My Portfolio</h1>

      {/* ===== Portfolio Summary ===== */}
      <div className="p-4 bg-gray-100 rounded shadow mb-6">
        <h2 className="text-lg font-semibold mb-2">Portfolio Summary</h2>
        <p><strong>Total Invested:</strong> ${totalInvested.toFixed(2)}</p>
        <p><strong>Current Value:</strong> ${currentValue.toFixed(2)}</p>
        <p className={`font-semibold ${totalGainLoss >= 0 ? 'text-green-600' : 'text-red-600'}`}>
          <strong>Overall Gain/Loss:</strong> 
          {totalGainLoss >= 0 ? ' +' : ' '}
          ${totalGainLoss.toFixed(2)} ({totalGainLossPercent}%)
        </p>
      </div>

      {/* ===== Portfolio Table ===== */}
      <table className="table-auto border-collapse border border-gray-400 w-full mb-6">
        <thead>
          <tr>
            <th className="border px-4 py-2">Stock</th>
            <th className="border px-4 py-2">Amount</th>
            <th className="border px-4 py-2">Avg Price</th>
            <th className="border px-4 py-2">Current Price</th>
            <th className="border px-4 py-2">Gain/Loss</th>
          </tr>
        </thead>
        <tbody>
          {portfolio.map((s, i) => {
            const currentPrice = mockPrices[s.symbol] || s.avgPrice;
            const totalSpent = s.amount * s.avgPrice;
            const stockValue = s.amount * currentPrice;
            const gainLoss = stockValue - totalSpent;
            const gainLossPercent = ((gainLoss / totalSpent) * 100).toFixed(2);

            return (
              <tr key={i}>
                <td className="border px-4 py-2">{s.symbol}</td>
                <td className="border px-4 py-2">{s.amount}</td>
                <td className="border px-4 py-2">${s.avgPrice}</td>
                <td className="border px-4 py-2">${currentPrice}</td>
                <td
                  className={`border px-4 py-2 font-semibold ${
                    gainLoss >= 0 ? 'text-green-600' : 'text-red-600'
                  }`}
                >
                  {gainLoss >= 0 ? '+' : ''}${gainLoss.toFixed(2)} ({gainLossPercent}%)
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>

      {/* ===== History ===== */}
      <h2 className="text-lg font-semibold mb-2">Transaction History</h2>
      <ul>
        {history.map((h, i) => (
          <li key={i}>
            {h.type} {h.amount} {h.symbol} @ ${h.price} on{' '}
            {h.date.toLocaleString()}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default PortfolioPage;
