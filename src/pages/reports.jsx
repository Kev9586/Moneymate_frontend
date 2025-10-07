import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  PieChart, Pie, BarChart, Bar, LineChart, Line, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer, Cell
} from 'recharts';
import MainLayout from '../layouts/MainLayout';
import Tabs from '../components/molecules/Tabs';
import Button from '../components/atoms/Button';
import Modal from '../components/molecules/Modal';

// Data for charts
const pieData = [
  { name: 'Food', value: 400 },
  { name: 'Transport', value: 300 },
  { name: 'Shopping', value: 300 },
  { name: 'Utilities', value: 200 },
];
const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];
const barData = [
  { name: 'Jan', income: 4000, expenses: 2400 },
  { name: 'Feb', income: 3000, expenses: 1398 },
  { name: 'Mar', income: 2000, expenses: 9800 },
];
const lineData = [
    { name: 'Week 1', balance: 4000 },
    { name: 'Week 2', balance: 3000 },
    { name: 'Week 3', balance: 2000 },
    { name: 'Week 4', balance: 2780 },
];

const ReportsScreen = () => {
  const [activeTab, setActiveTab] = useState('Pie Chart');
  const [isModalOpen, setIsModalOpen] = useState(false);

  const tabs = ['Pie Chart', 'Bar Chart', 'Line Chart'];

  const renderContent = () => {
    switch (activeTab) {
      case 'Pie Chart':
        return <PieChartComponent />;
      case 'Bar Chart':
        return <BarChartComponent />;
      case 'Line Chart':
        return <LineChartComponent />;
      default:
        return null;
    }
  };

  return (
    <MainLayout>
      <div className="p-4 sm:p-6">
        <div className="mb-6 flex items-center justify-between">
            <h1 className="text-2xl font-bold text-white">Reports</h1>
            <Button onClick={() => setIsModalOpen(true)}>Export</Button>
        </div>
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
      <AnimatePresence>
        {isModalOpen && (
            <Modal title="Export Report" onClose={() => setIsModalOpen(false)}>
                <p className="mb-4 text-white">Select format to export:</p>
                <div className="flex space-x-4">
                    <Button className="w-full">PDF</Button>
                    <Button className="w-full">CSV</Button>
                </div>
            </Modal>
        )}
      </AnimatePresence>
    </MainLayout>
  );
};

// Chart Components
const PieChartComponent = () => (
  <div className="rounded-lg bg-gray-800 p-4">
    <ResponsiveContainer width="100%" height={300}>
      <PieChart>
        <Pie data={pieData} cx="50%" cy="50%" labelLine={false} outerRadius={100} fill="#8884d8" dataKey="value" label>
          {pieData.map((entry, index) => <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />)}
        </Pie>
        <Tooltip />
        <Legend />
      </PieChart>
    </ResponsiveContainer>
  </div>
);

const BarChartComponent = () => (
    <div className="rounded-lg bg-gray-800 p-4">
        <ResponsiveContainer width="100%" height={300}>
            <BarChart data={barData}>
                <XAxis dataKey="name" stroke="#A0AEC0" />
                <YAxis stroke="#A0AEC0" />
                <Tooltip wrapperClassName="bg-gray-700 !border-gray-600" />
                <Legend />
                <Bar dataKey="income" fill="#48BB78" />
                <Bar dataKey="expenses" fill="#F56565" />
            </BarChart>
        </ResponsiveContainer>
    </div>
);

const LineChartComponent = () => (
    <div className="rounded-lg bg-gray-800 p-4">
        <ResponsiveContainer width="100%" height={300}>
            <LineChart data={lineData}>
                <XAxis dataKey="name" stroke="#A0AEC0" />
                <YAxis stroke="#A0AEC0" />
                <Tooltip wrapperClassName="bg-gray-700 !border-gray-600" />
                <Legend />
                <Line type="monotone" dataKey="balance" stroke="#8884d8" strokeWidth={2} />
            </LineChart>
        </ResponsiveContainer>
    </div>
);

export default ReportsScreen;