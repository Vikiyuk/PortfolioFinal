// src/pages/ContactPage.jsx
import React, { useState } from 'react';
import { motion } from 'framer-motion';

const supportSections = [
  {
    title: "Self-Service",
    items: [
      "Non-P2P Related Scam Report",
      "Disable Account",
      "Reset 2FA",
      "Reset Password",
      "Name/Birthday Correction",
      "Legacy Inheritance",
      "Change Residential Address",
      "Reset KYC",
      "Appeal KYC Rejection",
      "Crypto Deposit Not Arrived",
      "Transaction History",
      "Fiat Deposit Not Arrived Appeal",
      "Fiat Deposit Suspension",
      "Fiat Withdrawal Not Received",
      "Appeal P2P Performance Metrics",
      "Refund funds to P2P Counterparty",
      "Lift P2P Suspension",
      "P2P Order Receipts",
    ],
  },
  {
    title: "FAQ & Tutorials",
    items: [
      "Top Questions",
      "Latest Articles",
      "Binance Wallet Guide",
      "Identity Verification",
      "Introduction to Binance P2P",
      "Announcement",
      "New Cryptocurrency Listing",
      "Latest Binance News",
      "Maintenance Updates",
      "API Updates",
      "Crypto Airdrop",
    ],
  },
  {
    title: "Need More Support?",
    items: [
      "Chat Support - 24/7 available",
      "Product Feedback & Suggestions",
      "Community & Forum",
    ],
  },
];

const ContactPage = () => {
  const [openSection, setOpenSection] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");

  const toggleSection = (index) => setOpenSection(openSection === index ? null : index);

  const filteredSections = supportSections.map(section => ({
    ...section,
    items: section.items.filter(item =>
      item.toLowerCase().includes(searchQuery.toLowerCase())
    )
  }));

  return (
    <div className="min-h-screen bg-black text-white px-4 md:px-12 py-8">
      {/* Header */}
      <h1 className="text-4xl md:text-5xl font-bold text-purple-400 mb-4">
        Welcome To SARVAT Support Center
      </h1>
      <p className="text-gray-300 text-base md:text-lg mb-6">
        Search or browse topics to quickly get help.
      </p>

      {/* Search Bar */}
      <div className="mb-8">
        <input
          type="text"
          placeholder="Search or ask a question..."
          className="w-full md:w-1/2 p-3 rounded border border-gray-700 bg-gray-900 text-white placeholder-gray-400 focus:outline-none focus:border-purple-400"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>

      {/* Support Sections */}
      <div className="space-y-6">
        {filteredSections.map((section, idx) => (
          <div
            key={idx}
            className="bg-gray-900 p-4 rounded shadow hover:shadow-purple-500 transition-shadow duration-300"
          >
            <div
              className="flex justify-between items-center cursor-pointer"
              onClick={() => toggleSection(idx)}
            >
              <h2 className="text-xl font-semibold text-purple-400">{section.title}</h2>
              <motion.span
                className="text-purple-300"
                animate={{ rotate: openSection === idx ? 180 : 0 }}
                transition={{ duration: 0.3 }}
              >
                ▼
              </motion.span>
            </div>

            {openSection === idx && section.items.length > 0 && (
              <ul className="mt-2 text-gray-300 space-y-1 list-disc list-inside">
                {section.items.map((item, i) => (
                  <li
                    key={i}
                    className="hover:text-purple-400 transition-colors duration-200 cursor-pointer"
                  >
                    {item}
                  </li>
                ))}
              </ul>
            )}

            {openSection === idx && section.items.length === 0 && (
              <p className="mt-2 text-gray-500">No results found.</p>
            )}
          </div>
        ))}
      </div>

      {/* Chat Support */}
      <div className="fixed bottom-6 right-6 md:bottom-12 md:right-12">
        <button className="bg-purple-600 hover:bg-purple-500 text-white px-4 py-3 rounded-full shadow-lg flex items-center gap-2 animate-bounce">
          Chat Support
          <span className="text-white text-lg">💬</span>
        </button>
      </div>

      {/* Footer */}
      <footer className="mt-12 border-t border-gray-700 pt-6 text-gray-300 text-sm md:text-base">
        <p>© 2025 SARVAT</p>
        <p>Email: support@sarvat.com | Phone: +123 456 7890</p>
      </footer>
    </div>
  );
};

export default ContactPage;
