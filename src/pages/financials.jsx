import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  PieChart, Pie, ResponsiveContainer, Cell
} from 'recharts';
import { FiPlus } from 'react-icons/fi';
import MainLayout from '../layouts/MainLayout';
import Tabs from '../components/molecules/Tabs';
import ProgressBar from '../components/molecules/ProgressBar';

const FinancialsScreen = () => {
  const [activeTab, setActiveTab] = useState('Categories');

  const tabs = ['Categories', 'Budgets', 'Goals'];

  const renderContent = () => {
    switch (activeTab) {
      case 'Categories':
        return <CategoriesManager />;
      case 'Budgets':
        return <BudgetsTracker />;
      case 'Goals':
        return <GoalsVisualizer />;
      default:
        return null;
    }
  };

  return (
    <MainLayout>
      <div className="p-4 sm:p-6">
        <h1 className="mb-6 text-2xl font-bold text-white">Financials</h1>
        <Tabs tabs={tabs} activeTab={activeTab} setActiveTab={setActiveTab} />
        <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="mt-6"
        >
            {renderContent()}
        </motion.div>
      </div>
    </MainLayout>
  );
};

const CategoriesManager = () => {
    const [categories] = useState([
      { id: 1, name: 'Food', icon: '🍔' },
      { id: 2, name: 'Transport', icon: '🚗' },
      { id: 3, name: 'Shopping', icon: '🛍️' },
      { id: 4, name: 'Utilities', icon: '💡' },
    ]);

    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4"
      >
        {categories.map((cat, index) => (
          <motion.div
            key={cat.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            whileHover={{ scale: 1.05, boxShadow: '0px 10px 20px rgba(0,0,0,0.2)' }}
            className="flex cursor-pointer flex-col items-center justify-center rounded-lg bg-gray-800 p-4"
          >
            <span className="text-4xl">{cat.icon}</span>
            <p className="mt-2 text-white">{cat.name}</p>
          </motion.div>
        ))}
        <motion.div
          whileHover={{ scale: 1.05 }}
          className="flex cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed border-gray-700 p-4"
        >
          <FiPlus className="text-4xl text-gray-500" />
          <p className="mt-2 text-gray-500">Add Category</p>
        </motion.div>
      </motion.div>
    );
  };

  const BudgetsTracker = () => {
    const budgets = [
      { name: 'Food', spent: 450, total: 600 },
      { name: 'Shopping', spent: 300, total: 400 },
      { name: 'Utilities', spent: 150, total: 150 },
    ];

    return (
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-4">
        {budgets.map((budget, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.15 }}
            className="rounded-lg bg-gray-800 p-4"
          >
            <div className="mb-2 flex justify-between text-white">
              <span>{budget.name}</span>
              <span>
                ${budget.spent} / ${budget.total}
              </span>
            </div>
            <ProgressBar
              progress={(budget.spent / budget.total) * 100}
              isOverBudget={budget.spent > budget.total}
            />
          </motion.div>
        ))}
      </motion.div>
    );
  };

  const GoalsVisualizer = () => {
    const goals = [
      { name: 'Vacation Fund', current: 2500, target: 5000, color: '#8884d8' },
      { name: 'New Laptop', current: 800, target: 1500, color: '#82ca9d' },
      { name: 'Emergency Fund', current: 4500, target: 10000, color: '#ffc658' },
    ];

    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="grid grid-cols-1 gap-6 md:grid-cols-3"
      >
        {goals.map((goal, index) => {
          const percentage = Math.round((goal.current / goal.target) * 100);
          const data = [
            { name: 'Achieved', value: goal.current },
            { name: 'Remaining', value: goal.target - goal.current },
          ];
          return (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.2 }}
              className="flex flex-col items-center rounded-lg bg-gray-800 p-4"
            >
              <h3 className="mb-4 text-lg font-bold text-white">{goal.name}</h3>
              <div className="size-40">
                <ResponsiveContainer>
                  <PieChart>
                    <Pie
                      data={data}
                      cx="50%"
                      cy="50%"
                      innerRadius={60}
                      outerRadius={80}
                      fill="#8884d8"
                      paddingAngle={5}
                      dataKey="value"
                      startAngle={90}
                      endAngle={-270}
                    >
                      <Cell fill={goal.color} />
                      <Cell fill="#4A5568" />
                    </Pie>
                  </PieChart>
                </ResponsiveContainer>
              </div>
              <p className="mt-4 text-xl font-semibold text-white">{percentage}%</p>
              <p className="text-sm text-gray-400">
                ${goal.current.toLocaleString()} / ${goal.target.toLocaleString()}
              </p>
            </motion.div>
          );
        })}
      </motion.div>
    );
  };

export default FinancialsScreen;