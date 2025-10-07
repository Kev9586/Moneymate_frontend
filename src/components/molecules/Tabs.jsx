import React, { useState } from 'react';
import { motion } from 'framer-motion';

const Tabs = ({ tabs }) => {
  const [selectedTab, setSelectedTab] = useState(0);

  return (
    <div>
      <div className="flex border-b border-gray-200">
        {tabs.map((tab, index) => (
          <button
            key={tab.label}
            className={`relative py-2 px-4 text-lg font-medium ${
              selectedTab === index ? 'text-primaryBlue' : 'text-gray-500'
            }`}
            onClick={() => setSelectedTab(index)}
          >
            {tab.label}
            {selectedTab === index && (
              <motion.div
                className="absolute bottom-0 left-0 right-0 h-0.5 bg-primaryBlue"
                layoutId="underline"
              />
            )}
          </button>
        ))}
      </div>
      <div className="p-4">
        {tabs[selectedTab] && tabs[selectedTab].content}
      </div>
    </div>
  );
};

export default Tabs;