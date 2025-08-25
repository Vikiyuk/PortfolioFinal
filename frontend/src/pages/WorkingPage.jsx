import React from 'react';
import Header from '../components/Header';
import Balance from '../components/Balance';
import BuySell from '../components/BuySell';
import PriceGraph from '../components/PriceGraph';
import GainLossTable from '../components/GainLossTable';

const WorkingPage = () => {
  return (
    <div className="min-h-screen bg-black text-white px-8 py-6">
      {/* Header */}
      <div className="mb-10">
        <Header />
      </div>

      {/* Main content */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
        {/* Left column */}
        <div className="space-y-8">
          <div className="bg-gray-900 p-6 rounded-2xl">
            <Balance />
          </div>
          <div className="bg-gray-900 p-6 rounded-2xl">
            <BuySell />
          </div>
        </div>

        {/* Right column */}
        <div className="col-span-2 space-y-8">
          <div className="bg-gray-900 p-6 rounded-2xl">
            <PriceGraph />
          </div>
          <div className="bg-gray-900 p-6 rounded-2xl">
            <GainLossTable />
          </div>
        </div>
      </div>
    </div>
  );
};

export default WorkingPage;
