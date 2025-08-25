import React, { useContext } from "react";
import { StockContext } from "../context/StockContext";
import { motion } from "framer-motion";

const GainLossTable = () => {
  const { trends } = useContext(StockContext);

  return (
      <div className="p-4 bg-gradient-to-br from-black via-purple-900 to-black rounded-xl shadow-lg border border-purple-700">
        <h2 className="text-xl font-bold mb-4 text-purple-400">📊 Trends</h2>
        <table className="w-full border-collapse">
          <thead>
          <tr className="bg-purple-900/50 text-purple-200">
            <th className="border p-2">Ticker</th>
            <th className="border p-2">Stock</th>
            <th className="border p-2">Price (14d ago)</th>
            <th className="border p-2">Price (current)</th>
            <th className="border p-2">Change ($)</th>
            <th className="border p-2">Change (%)</th>
          </tr>
          </thead>
          <tbody>
          {trends.length > 0 ? (
              trends.map((stock, index) => (
                  <motion.tr
                      key={index}
                      className="text-center border-b border-purple-700"
                      whileHover={{
                        scale: 1.02,
                        boxShadow: "0 0 15px #9d4edd, 0 0 30px #d39fff",
                      }}
                      transition={{ duration: 0.3 }}
                  >
                    <td className="border p-2 text-purple-100">{stock.ticker}</td>
                    <td className="border p-2 text-purple-100">{stock.name}</td>
                    <td className="border p-2 text-purple-100">${stock.startPrice.toFixed(2)}</td>
                    <td className="border p-2 text-purple-100">${stock.endPrice.toFixed(2)}</td>
                    <td className={`border p-2 ${stock.priceChange >= 0 ? "text-green-400" : "text-red-400"}`}>
                      {stock.priceChange.toFixed(2)}
                    </td>
                    <td className={`border p-2 ${stock.percentChange >= 0 ? "text-green-400" : "text-red-400"}`}>
                      {stock.percentChange.toFixed(2)}%
                    </td>
                  </motion.tr>
              ))
          ) : (
              <tr>
                <td className="border p-2 text-center text-purple-200" colSpan="6">
                  No stocks available.
                </td>
              </tr>
          )}
          </tbody>
        </table>
      </div>
  );
};

export default GainLossTable;
