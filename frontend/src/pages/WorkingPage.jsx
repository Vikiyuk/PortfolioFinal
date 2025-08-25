import React from 'react';
import Header from '../components/Header';
import Balance from '../components/Balance';
import BuySell from '../components/BuySell';
import PriceGraph from '../components/PriceGraph';
import GainLossTable from '../components/GainLossTable';
import { motion } from 'framer-motion';

const WorkingPage = () => {
  return (
    <div className="working-page min-h-screen bg-black text-white p-6">
      {/* Page Heading */}
      <motion.h1
        className="text-4xl md:text-5xl font-bold text-center text-purple-400 mb-4"
      >
        Dashboard
      </motion.h1>

      {/* Separator line */}
      <div className="w-24 h-1 bg-purple-400 mx-auto rounded-full shadow-md mb-12"></div>

      {/* Main content layout */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10 mt-6">
        {/* Left column (Balance + Buy/Sell stacked) */}
        <div className="col-span-1 space-y-10">
          <div className="bg-gray-900 p-6 rounded-xl shadow transition-shadow duration-300">
            <Balance />
          </div>
          <div className="bg-gray-900 p-6 rounded-xl shadow transition-shadow duration-300">
            <BuySell />
          </div>
        </div>

        {/* Right column (Graph + GainLossTable) */}
        <div className="col-span-2 space-y-10">
          <div className="bg-gray-900 p-6 rounded-xl shadow transition-shadow duration-300">
            <PriceGraph />
          </div>
          <div className="bg-gray-900 p-6 rounded-xl shadow transition-shadow duration-300">
            <GainLossTable />
          </div>
        </div>
      </div>
    </div>
  );
};

export default WorkingPage;
