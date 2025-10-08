import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { PieChart, Pie, ResponsiveContainer, Cell } from 'recharts';
import { FiPlus } from 'react-icons/fi';
import MainLayout from '../layouts/MainLayout';
import Tabs from '../components/molecules/Tabs';
import ProgressBar from '../components/molecules/ProgressBar';
import Modal from '../components/molecules/Modal';
import InputField from '../components/atoms/InputField';
import Button from '../components/atoms/Button';
import { useToast } from '../context/ToastContext';
import { getCategories, addCategory } from '../api/categories';
import { getBudgets, addBudget } from '../api/budgets';
import { getGoals, addGoal } from '../api/goals';
import LoadingState from '../components/molecules/LoadingState';
import EmptyState from '../components/molecules/EmptyState';
import ErrorState from '../components/molecules/ErrorState';

const FinancialsScreen = () => {
  const [activeTab, setActiveTab] = useState('Categories');
  const [status, setStatus] = useState('loading');
  const [data, setData] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { addToast } = useToast();

  const tabs = ['Categories', 'Budgets', 'Goals'];

  const fetchData = async () => {
    setStatus('loading');
    try {
      let response;
      if (activeTab === 'Categories') {
        response = await getCategories();
        setData(response.categories || []);
        setStatus((response.categories || []).length > 0 ? 'success' : 'empty');
      } else if (activeTab === 'Budgets') {
        response = await getBudgets();
        setData(response.budgets || []);
        setStatus((response.budgets || []).length > 0 ? 'success' : 'empty');
      } else if (activeTab === 'Goals') {
        response = await getGoals();
        setData(response.goals || []);
        setStatus((response.goals || []).length > 0 ? 'success' : 'empty');
      }
    } catch {
      setStatus('error');
      addToast({ type: 'error', message: `Failed to fetch ${activeTab.toLowerCase()}.` });
    }
  };

  useEffect(() => {
    fetchData();
  }, [activeTab]);

  const handleAddClick = () => setIsModalOpen(true);

  const handleSave = async (formData) => {
    try {
      if (activeTab === 'Categories') await addCategory(formData);
      else if (activeTab === 'Budgets') await addBudget(formData);
      else if (activeTab === 'Goals') await addGoal(formData);
      addToast({ type: 'success', message: `${activeTab.slice(0, -1)} added successfully!` });
      fetchData();
      setIsModalOpen(false);
    } catch {
      addToast({ type: 'error', message: `Failed to add ${activeTab.slice(0, -1).toLowerCase()}.` });
    }
  };

  const renderContent = () => {
    if (status === 'loading') return <LoadingState message={`Loading ${activeTab.toLowerCase()}...`} />;
    if (status === 'error') return <ErrorState message={`Could not fetch ${activeTab.toLowerCase()}.`} onRetry={fetchData} />;

    const props = { data, onAdd: handleAddClick };
    if (status === 'empty') props.isEmpty = true;

    switch (activeTab) {
      case 'Categories':
        return <CategoriesManager {...props} />;
      case 'Budgets':
        return <BudgetsTracker {...props} />;
      case 'Goals':
        return <GoalsVisualizer {...props} />;
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
        <AddFinancialsModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          onSave={handleSave}
          type={activeTab}
        />
      </div>
    </MainLayout>
  );
};

const CategoriesManager = ({ data = [], onAdd, isEmpty }) => (
  <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4">
    {data.map((cat, index) => (
      <motion.div
        key={cat.id}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: index * 0.1 }}
        whileHover={{ scale: 1.05, boxShadow: '0px 10px 20px rgba(0,0,0,0.2)' }}
        className="flex cursor-pointer flex-col items-center justify-center rounded-lg bg-gray-800 p-4"
      >
        <span className="text-4xl">{cat.icon || '📁'}</span>
        <p className="mt-2 text-white">{cat.name}</p>
      </motion.div>
    ))}
    <motion.div
      onClick={onAdd}
      whileHover={{ scale: 1.05 }}
      className="flex cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed border-gray-700 p-4"
    >
      <FiPlus className="text-4xl text-gray-500" />
      <p className="mt-2 text-gray-500">Add Category</p>
    </motion.div>
    {isEmpty && <EmptyState message="No categories found." />}
  </motion.div>
);

const BudgetsTracker = ({ data = [], onAdd, isEmpty }) => (
  <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-4">
    {data.map((budget, index) => (
      <motion.div
        key={index}
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: index * 0.15 }}
        className="rounded-lg bg-gray-800 p-4"
      >
        <div className="mb-2 flex justify-between text-white">
          <span>{budget.name}</span>
          <span>${budget.spent || 0} / ${budget.total}</span>
        </div>
        <ProgressBar progress={((budget.spent || 0) / budget.total) * 100} isOverBudget={(budget.spent || 0) > budget.total} />
      </motion.div>
    ))}
    <Button onClick={onAdd} className="w-full">Add Budget</Button>
    {isEmpty && <EmptyState message="No budgets found." />}
  </motion.div>
);

const GoalsVisualizer = ({ data = [], onAdd, isEmpty }) => (
  <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="grid grid-cols-1 gap-6 md:grid-cols-3">
    {data.map((goal, index) => {
      const percentage = Math.round(((goal.current || 0) / goal.target) * 100);
      const pieData = [{ value: goal.current || 0 }, { value: Math.max(0, goal.target - (goal.current || 0)) }];
      return (
        <motion.div key={index} initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: index * 0.2 }} className="flex flex-col items-center rounded-lg bg-gray-800 p-4">
          <h3 className="mb-4 text-lg font-bold text-white">{goal.name}</h3>
          <div className="size-40">
            <ResponsiveContainer>
              <PieChart>
                <Pie data={pieData} cx="50%" cy="50%" innerRadius={60} outerRadius={80} fill="#8884d8" paddingAngle={5} dataKey="value" startAngle={90} endAngle={-270}>
                  <Cell fill={goal.color || '#8884d8'} />
                  <Cell fill="#4A5568" />
                </Pie>
              </PieChart>
            </ResponsiveContainer>
          </div>
          <p className="mt-4 text-xl font-semibold text-white">{percentage}%</p>
          <p className="text-sm text-gray-400">${(goal.current || 0).toLocaleString()} / ${goal.target.toLocaleString()}</p>
        </motion.div>
      );
    })}
     <motion.div
      onClick={onAdd}
      whileHover={{ scale: 1.05 }}
      className="flex min-h-[200px] cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed border-gray-700 p-4"
    >
      <FiPlus className="text-4xl text-gray-500" />
      <p className="mt-2 text-gray-500">Add Goal</p>
    </motion.div>
    {isEmpty && <EmptyState message="No goals found." />}
  </motion.div>
);

const AddFinancialsModal = ({ isOpen, onClose, onSave, type }) => {
  const [name, setName] = useState('');
  const [icon, setIcon] = useState('');
  const [total, setTotal] = useState('');
  const [target, setTarget] = useState('');

  useEffect(() => {
    if (isOpen) {
      setName('');
      setIcon('');
      setTotal('');
      setTarget('');
    }
  }, [isOpen]);

  const handleSubmit = (e) => {
    e.preventDefault();
    let formData = { name };
    if (type === 'Categories') formData.icon = icon;
    if (type === 'Budgets') formData.total = parseFloat(total);
    if (type === 'Goals') formData.target = parseFloat(target);
    onSave(formData);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <Modal title={`Add New ${type.slice(0, -1)}`} onClose={onClose}>
          <form onSubmit={handleSubmit} className="flex flex-col space-y-4">
            <InputField label="Name" value={name} onChange={(e) => setName(e.target.value)} required />
            {type === 'Categories' && <InputField label="Icon (e.g., 🍔)" value={icon} onChange={(e) => setIcon(e.target.value)} />}
            {type === 'Budgets' && <InputField label="Total Amount" type="number" value={total} onChange={(e) => setTotal(e.target.value)} required />}
            {type === 'Goals' && <InputField label="Target Amount" type="number" value={target} onChange={(e) => setTarget(e.target.value)} required />}
            <Button type="submit">Add</Button>
          </form>
        </Modal>
      )}
    </AnimatePresence>
  );
};

export default FinancialsScreen;