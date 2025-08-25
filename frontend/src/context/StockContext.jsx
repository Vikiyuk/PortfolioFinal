// src/context/StockContext.jsx
import React, { createContext, useState, useEffect } from 'react';

export const StockContext = createContext();

export const StockProvider = ({ children }) => {
  const [balance, setBalance] = useState(10000); // fallback starting balance
  const [portfolio, setPortfolio] = useState([]); 
  const [history, setHistory] = useState([]);

  const [useBackend, setUseBackend] = useState(false); // toggle to switch between mock and real API

  // ===== Fetch from backend if ready =====
  useEffect(() => {
    if (useBackend) {
      fetchPortfolio();
      fetchBalance();
      fetchHistory();
    }
  }, [useBackend]);

  const fetchPortfolio = async () => {
    try {
      const res = await fetch('http://backend-url.com/api/portfolio');
      const data = await res.json();
      setPortfolio(data);
    } catch (error) {
      console.error("Failed to fetch portfolio", error);
    }
  };

  const fetchBalance = async () => {
    try {
      const res = await fetch('http://backend-url.com/api/balance');
      const data = await res.json();
      setBalance(data.balance);
    } catch (error) {
      console.error("Failed to fetch balance", error);
    }
  };

  const fetchHistory = async () => {
    try {
      const res = await fetch('http://backend-url.com/api/history');
      const data = await res.json();
      setHistory(data);
    } catch (error) {
      console.error("Failed to fetch history", error);
    }
  };

  // ===== Buy / Sell Functions =====
  const buyStock = async (symbol, amount, price) => {
    if (useBackend) {
      try {
        await fetch('http://backend-url.com/api/buy', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ symbol, amount, price })
        });
        await fetchPortfolio();
        await fetchBalance();
      } catch (error) {
        console.error("Buy failed", error);
      }
    } else {
      const cost = amount * price;
      if (balance >= cost) {
        setBalance(balance - cost);
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
    }
  };

  const sellStock = async (symbol, amount, price) => {
    if (useBackend) {
      try {
        await fetch('http://backend-url.com/api/sell', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ symbol, amount, price })
        });
        await fetchPortfolio();
        await fetchBalance();
      } catch (error) {
        console.error("Sell failed", error);
      }
    } else {
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
    }
  };

  return (
    <StockContext.Provider value={{ 
      balance, 
      portfolio, 
      history, 
      buyStock, 
      sellStock, 
      useBackend, 
      setUseBackend 
    }}>
      {children}
    </StockContext.Provider>
  );
};
