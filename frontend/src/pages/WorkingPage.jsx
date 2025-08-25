import React from 'react';
import Header from '../components/Header';
import Balance from '../components/Balance';
import BuySell from '../components/BuySell';
import PriceGraph from '../components/PriceGraph';
import GainLossTable from '../components/GainLossTable';
import StockTable from "../components/StockTable.jsx";

const WorkingPage = () => {
  return (
    <div className="working-page min-h-screen bg-black text-white p-6">
      {/* Header */}
      <Header />

      {/* Main content layout */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-6">
        {/* Left column (Balance + Buy/Sell stacked) */}
        <div className="col-span-1 space-y-6">
          <Balance />
          <StockTable />
        </div>

        {/* Right column (Graph + GainLossTable) */}
        <div className="col-span-2 space-y-6">
          <div className="bg-black p-4 rounded shadow hover:shadow-purple-500 transition-shadow duration-300">
            <PriceGraph />
          </div>
          <div className="bg-black p-4 rounded shadow hover:shadow-purple-500 transition-shadow duration-300">
            <GainLossTable />
          </div>
        </div>
      </div>
    </div>
  );
};

export default WorkingPage;
