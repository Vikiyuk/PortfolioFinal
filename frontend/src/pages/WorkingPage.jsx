import React from 'react';
import Header from '../components/Header';
import Balance from '../components/Balance';
import BuySell from '../components/BuySell';
import PriceGraph from '../components/PriceGraph';
import GainLossTable from '../components/GainLossTable'; // optional, if you want quick summary

const WorkingPage = () => {
  return (
    <div className="working-page min-h-screen bg-gray-50 p-6">
      {/* Header */}
      <Header />

      {/* Main content layout */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-6">
        {/* Left column (Balance + Buy/Sell stacked) */}
        <div className="col-span-1 space-y-6">
          <Balance />
          <BuySell />
        </div>

        {/* Right column (Graph + optional table) */}
        <div className="col-span-2 space-y-6">
          <PriceGraph />
          <GainLossTable /> {/* Optional enhancement */}
        </div>
      </div>
    </div>
  );
};

export default WorkingPage;
