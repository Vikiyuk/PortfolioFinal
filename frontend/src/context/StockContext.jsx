// src/context/StockContext.jsx
import React, { createContext, useState } from 'react';

export const StockContext = createContext();

export const StockProvider = ({ children }) => {
  const [balance, setBalance] = useState(10000); // starting balance
  const [portfolio, setPortfolio] = useState([]); // array of stocks
  const [history, setHistory] = useState([]); // transactions

  const buyStock = (symbol, amount, price) => {
    const cost = amount * price;
    if (balance >= cost) {
      setBalance(balance - cost);

      // Check if stock already exists
      const existing = portfolio.find((s) => s.symbol === symbol);
      if (existing) {
        existing.amount += amount;
        existing.totalSpent += cost;
        existing.avgPrice = (existing.totalSpent / existing.amount).toFixed(2);
        setPortfolio([...portfolio]);
      } else {
        setPortfolio([...portfolio, { symbol, amount, avgPrice: price, totalSpent: cost }]);
      }

      setHistory([...history, { type: "BUY", symbol, amount, price, date: new Date() }]);
    } else {
      alert("Not enough balance!");
    }
  };

  const sellStock = (symbol, amount, price) => {
    const existing = portfolio.find((s) => s.symbol === symbol);
    if (existing && existing.amount >= amount) {
      existing.amount -= amount;
      setBalance(balance + amount * price);

      if (existing.amount === 0) {
        setPortfolio(portfolio.filter((s) => s.symbol !== symbol));
      } else {
        setPortfolio([...portfolio]);
      }

      setHistory([...history, { type: "SELL", symbol, amount, price, date: new Date() }]);
    } else {
      alert("Not enough stock to sell!");
    }
  };

  return (
    <StockContext.Provider value={{ balance, portfolio, history, buyStock, sellStock }}>
      {children}
    </StockContext.Provider>
  );
};
