import React from 'react';

const Select = ({ options, onSelect }) => {
  return (
    <select
      className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-primaryBlue focus:border-primaryBlue transition-all duration-300"
      onChange={(e) => onSelect(e.target.value)}
    >
      {options.map(option => (
        <option key={option.value} value={option.value}>{option.label}</option>
      ))}
    </select>
  );
};

export default Select;