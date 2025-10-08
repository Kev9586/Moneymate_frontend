import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { PieChart, Pie, BarChart, Bar, LineChart, Line, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer, Cell } from 'recharts';
import MainLayout from '../layouts/MainLayout';
import Tabs from '../components/molecules/Tabs';
import Button from '../components/atoms/Button';
import Modal from '../components/molecules/Modal';
import { useToast } from '../context/ToastContext';
import { getSummaryReport, getTrendsReport } from '../api/reports';
import LoadingState from '../components/molecules/LoadingState';
import EmptyState from '../components/molecules/EmptyState';
import ErrorState from '../components/molecules/ErrorState';

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#AF19FF', '#FF4560'];

const ReportsScreen = () => {
  const [activeTab, setActiveTab] = useState('By Category');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [status, setStatus] = useState('loading');
  const [reportData, setReportData] = useState(null);
  const [dateRange, setDateRange] = useState('last30days');
  const { addToast } = useToast();

  const tabs = ['By Category', 'Over Time', 'Cash Flow'];

  const fetchReportData = async () => {
    setStatus('loading');
    try {
      let response;
      const params = { dateRange };
      if (activeTab === 'By Category') {
        response = await getSummaryReport(params);
        setReportData(response.summary || []);
        setStatus((response.summary || []).length > 0 ? 'success' : 'empty');
      } else {
        response = await getTrendsReport(params);
        setReportData(response.trends || []);
        setStatus((response.trends || []).length > 0 ? 'success' : 'empty');
      }
    } catch {
      setStatus('error');
      addToast({ type: 'error', message: 'Failed to load report data.' });
    }
  };

  useEffect(() => {
    fetchReportData();
  }, [activeTab, dateRange]);

  const renderContent = () => {
    if (status === 'loading') return <LoadingState message="Generating your report..." />;
    if (status === 'error') return <ErrorState message="Could not generate report." onRetry={fetchReportData} />;
    if (status === 'empty') return <EmptyState message="No data available for this report." />;

    switch (activeTab) {
      case 'By Category':
        return <PieChartComponent data={reportData} />;
      case 'Over Time':
        return <LineChartComponent data={reportData} />;
      case 'Cash Flow':
        return <BarChartComponent data={reportData} />;
      default:
        return null;
    }
  };

  return (
    <MainLayout>
      <div className="p-4 sm:p-6">
        <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <h1 className="text-2xl font-bold text-white">Reports</h1>
          <div className="flex items-center gap-2">
            <select
              value={dateRange}
              onChange={(e) => setDateRange(e.target.value)}
              className="rounded bg-gray-700 px-2 py-1 text-white focus:outline-none"
            >
              <option value="last7days">Last 7 Days</option>
              <option value="last30days">Last 30 Days</option>
              <option value="last90days">Last 90 Days</option>
            </select>
            <Button onClick={() => setIsModalOpen(true)}>Export</Button>
          </div>
        </div>
        <Tabs tabs={tabs} activeTab={activeTab} setActiveTab={setActiveTab} />
        <motion.div
          key={activeTab + dateRange}
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
const PieChartComponent = ({ data }) => (
  <div className="rounded-lg bg-gray-800 p-4">
    <h3 className="mb-4 text-lg font-semibold text-white">Spending by Category</h3>
    <ResponsiveContainer width="100%" height={300}>
      <PieChart>
        <Pie data={data} cx="50%" cy="50%" labelLine={false} outerRadius={100} fill="#8884d8" dataKey="value" nameKey="name" label>
          {data.map((entry, index) => <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />)}
        </Pie>
        <Tooltip wrapperClassName="bg-gray-700 !border-gray-600" />
        <Legend />
      </PieChart>
    </ResponsiveContainer>
  </div>
);

const BarChartComponent = ({ data }) => (
  <div className="rounded-lg bg-gray-800 p-4">
    <h3 className="mb-4 text-lg font-semibold text-white">Income vs. Expenses</h3>
    <ResponsiveContainer width="100%" height={300}>
      <BarChart data={data}>
        <XAxis dataKey="name" stroke="#A0AEC0" />
        <YAxis stroke="#A0AEC0" />
        <Tooltip wrapperClassName="bg-gray-700 !border-gray-600" />
        <Legend />
        <Bar dataKey="income" fill="#48BB78" name="Income" />
        <Bar dataKey="expenses" fill="#F56565" name="Expenses" />
      </BarChart>
    </ResponsiveContainer>
  </div>
);

const LineChartComponent = ({ data }) => (
  <div className="rounded-lg bg-gray-800 p-4">
    <h3 className="mb-4 text-lg font-semibold text-white">Balance Over Time</h3>
    <ResponsiveContainer width="100%" height={300}>
      <LineChart data={data}>
        <XAxis dataKey="name" stroke="#A0AEC0" />
        <YAxis stroke="#A0AEC0" />
        <Tooltip wrapperClassName="bg-gray-700 !border-gray-600" />
        <Legend />
        <Line type="monotone" dataKey="balance" stroke="#8884d8" strokeWidth={2} name="Balance" />
      </LineChart>
    </ResponsiveContainer>
  </div>
);

export default ReportsScreen;