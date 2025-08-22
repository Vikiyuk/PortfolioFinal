// src/pages/WelcomePage.jsx
import React from 'react';

const WelcomePage = () => {
  const trends = ["AI Stocks Rising", "Oil Prices Dropping", "Crypto Surges"];
  const topGains = [{symbol: "AAPL", change: "+5%"}, {symbol: "TSLA", change: "+3%"}];
  const topLosses = [{symbol: "AMZN", change: "-4%"}, {symbol: "MSFT", change: "-2%"}];

  return (
    <div className="p-4">
      <h1 className="text-xl font-bold mb-4">Welcome Page</h1>
      
      <section className="mb-4">
        <h2 className="font-semibold">Trends</h2>
        <ul>{trends.map((t, i) => <li key={i}>{t}</li>)}</ul>
      </section>

      <section className="mb-4">
        <h2 className="font-semibold">Top 5 Gains</h2>
        <ul>{topGains.map((g, i) => <li key={i}>{g.symbol}: {g.change}</li>)}</ul>
      </section>

      <section className="mb-4">
        <h2 className="font-semibold">Top 5 Losses</h2>
        <ul>{topLosses.map((l, i) => <li key={i}>{l.symbol}: {l.change}</li>)}</ul>
      </section>

      <section>
        <h2 className="font-semibold">Q&A</h2>
        <p><strong>Q:</strong> How do I buy a stock?</p>
        <p><strong>A:</strong> Go to Working Page and use Buy form.</p>
      </section>
    </div>
  );
};

export default WelcomePage;
