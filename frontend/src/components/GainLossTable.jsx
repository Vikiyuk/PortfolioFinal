import React, { useContext } from "react";
import { StockContext } from "../context/StockContext";
import { motion } from "framer-motion";

const GainLossTable = () => {
  const { portfolio } = useContext(StockContext);

  const calculateGainLoss = (stock) => {
    const totalCost = stock.shares * stock.buyPrice;
    const currentValue = stock.shares * stock.currentPrice;
    const gainLoss = currentValue - totalCost;
    const percentage = ((gainLoss / totalCost) * 100).toFixed(2);
    return { gainLoss, percentage };
  };

  return (
    <div className="p-4 bg-gradient-to-br from-black via-purple-900 to-black rounded-xl shadow-lg border border-purple-700">
      <h2 className="text-xl font-bold mb-4 text-purple-400">📊 Portfolio Performance</h2>
      <table className="w-full border-collapse">
        <thead>
          <tr className="bg-purple-900/50 text-purple-200">
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
                <motion.tr
                  key={index}
                  className="text-center border-b border-purple-700"
                  whileHover={{
                    scale: 1.02,
                    boxShadow: "0 0 15px #9d4edd, 0 0 30px #d39fff",
                  }}
                  transition={{ duration: 0.3 }}
                >
                  <td className="border p-2 text-purple-100">{stock.symbol}</td>
                  <td className="border p-2 text-purple-100">{stock.shares}</td>
                  <td className="border p-2 text-purple-100">${stock.buyPrice}</td>
                  <td className="border p-2 text-purple-100">${stock.currentPrice}</td>
                  <td className={`border p-2 ${gainLoss >= 0 ? "text-green-400" : "text-red-400"}`}>
                    {gainLoss.toFixed(2)}
                  </td>
                  <td className={`border p-2 ${percentage >= 0 ? "text-green-400" : "text-red-400"}`}>
                    {percentage}%
                  </td>
                </motion.tr>
              );
            })
          ) : (
            <tr>
              <td className="border p-2 text-center text-purple-200" colSpan="6">
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
