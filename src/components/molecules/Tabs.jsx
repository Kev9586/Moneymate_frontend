import React from 'react';
import { motion } from 'framer-motion';

const Tabs = ({ tabs, activeTab, setActiveTab, scrollable }) => {
  return (
    <div
      className={`flex border-b border-gray-700 ${
        scrollable ? 'overflow-x-auto' : ''
      }`}
    >
      {tabs.map((tab) => (
        <button
          key={tab}
          onClick={() => setActiveTab(tab)}
          className={`relative shrink-0 px-4 py-2 text-lg font-medium ${
            activeTab === tab ? 'text-white' : 'text-gray-400'
          }`}
        >
          {tab}
          {activeTab === tab && (
            <motion.div
              className="absolute inset-x-0 bottom-0 h-0.5 bg-blue-500"
              layoutId="underline"
            />
          )}
        </button>
      ))}
    </div>
  );
};

export default Tabs;