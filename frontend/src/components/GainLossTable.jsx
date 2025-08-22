// src/components/GainLossTable.jsx
import React, { useContext } from "react";
import { StockContext } from "../context/StockContext";

const GainLossTable = () => {
  const { portfolio } = useContext(StockContext);

  // Example: portfolio = [{ symbol: "AAPL", shares: 10, buyPrice: 150, currentPrice: 170 }]
  const calculateGainLoss = (stock) => {
    const totalCost = stock.shares * stock.buyPrice;
    const currentValue = stock.shares * stock.currentPrice;
    const gainLoss = currentValue - totalCost;
    const percentage = ((gainLoss / totalCost) * 100).toFixed(2);
    return { gainLoss, percentage };
  };

  return (
    <div className="p-4 bg-white rounded-xl shadow-md">
      <h2 className="text-xl font-bold mb-4">📊 Portfolio Performance</h2>
      <table className="w-full border-collapse">
        <thead>
          <tr className="bg-gray-100">
            <th className="border p-2">Stock</th>
            <th className="border p-2">Shares</th>
            <th className="border p-2">Buy Price</th>
            <th className="border p-2">Current Price</th>
            <th className="border p-2">Gain/Loss ($)</th>
            <th className="border p-2">Gain/Loss (%)</th>
          </tr>
        </thead>
        <tbody>
          {portfolio.length > 0 ? (
            portfolio.map((stock, index) => {
              const { gainLoss, percentage } = calculateGainLoss(stock);
              return (
                <tr key={index} className="text-center">
                  <td className="border p-2">{stock.symbol}</td>
                  <td className="border p-2">{stock.shares}</td>
                  <td className="border p-2">${stock.buyPrice}</td>
                  <td className="border p-2">${stock.currentPrice}</td>
                  <td
                    className={`border p-2 ${
                      gainLoss >= 0 ? "text-green-600" : "text-red-600"
                    }`}
                  >
                    {gainLoss.toFixed(2)}
                  </td>
                  <td
                    className={`border p-2 ${
                      percentage >= 0 ? "text-green-600" : "text-red-600"
                    }`}
                  >
                    {percentage}%
                  </td>
                </tr>
              );
            })
          ) : (
            <tr>
              <td className="border p-2 text-center" colSpan="6">
                No stocks in portfolio yet.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default GainLossTable;
