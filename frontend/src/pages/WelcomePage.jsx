// src/pages/WelcomePage.jsx
import React, { useState } from 'react';
import Navbar from '../components/Navbar';
import Hero from '../components/Hero';
import GainLossTable from '../components/GainLossTable';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, Title, Tooltip, Legend, LineElement, CategoryScale, LinearScale, PointElement } from 'chart.js';
import { useNavigate } from 'react-router-dom';

ChartJS.register(Title, Tooltip, Legend, LineElement, CategoryScale, LinearScale, PointElement);

const faqData = [
  { question: "What products does Sarvat provide?", answer: "Tools for managing your portfolio, viewing trends, and tracking gains/losses." },
  { question: "How can I use Sarvat’s balance system?", answer: "Buy/sell stocks using the WorkPage, balance updates automatically." },
  { question: "Why choose Sarvat over others?", answer: "Combines portfolio management with interactive trend analytics and modern UI." }
];

const trendData = {
  labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May'],
  datasets: [
    {
      label: 'Market Trend',
      data: [120, 130, 125, 140, 135],
      borderColor: '#9d4edd',
      backgroundColor: 'rgba(157,78,221,0.2)',
      tension: 0.4,
    },
  ],
};

const WelcomePage = () => {
  const [openFAQ, setOpenFAQ] = useState(null);
  const navigate = useNavigate();
  const toggleFAQ = (index) => setOpenFAQ(openFAQ === index ? null : index);

  return (
    <div className="min-h-screen bg-black text-white flex flex-col">
      

      {/* Hero Section */}
      <Hero navigate={navigate} />

      {/* Trends + GainLoss Section */}
      <div className="md:flex md:space-x-6 px-8 py-8 border-b border-white-700">
        {/* Trend Chart */}
        <div className="md:w-1/2 p-4 rounded-xl bg-gradient-to-br from-black via-purple-900 to-black shadow-lg hover:shadow-[0_0_30px_rgba(157,78,221,0.7)] transition-shadow duration-500 mb-6 md:mb-0 border border-purple-700">
          <Line data={trendData} />
        </div>

        {/* Gain/Loss Table */}
        <div className="md:w-1/2 p-4 rounded-xl bg-gradient-to-br from-black via-purple-900 to-black shadow-lg hover:shadow-[0_0_30px_rgba(157,78,221,0.7)] transition-shadow duration-500 border border-purple-700">
          <GainLossTable />
        </div>
      </div>

      {/* FAQ Section */}
      <div className="px-8 py-8 border-b border-gray-700">
        <h2 className="text-3xl font-bold text-purple-400 mb-4">Frequently Asked Questions</h2>
        <div className="space-y-3">
          {faqData.map((item, idx) => (
            <div key={idx} className="border-b border-gray-700 pb-2">
              <div
                className="flex justify-between cursor-pointer hover:text-purple-400 transition-colors duration-300"
                onClick={() => toggleFAQ(idx)}
              >
                <span className="text-purple-300 font-medium">{item.question}</span>
                <span className="text-purple-500">{openFAQ === idx ? "▲" : "▼"}</span>
              </div>
              {openFAQ === idx && (
                <p className="text-gray-300 mt-2">{item.answer}</p>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-gray-900 p-8 text-gray-300 text-center border-t border-gray-700">
        <h3 className="text-xl font-bold text-purple-400">Contact Us</h3>
        <p>Email: contact@sarvat.com | Phone: +123 456 7890</p>
        <p>GitHub: <a href="https://github.com/Vikiyuk" className="text-purple-400">Vikiyuk</a></p>
      </footer>
    </div>
  );
};

export default WelcomePage;
