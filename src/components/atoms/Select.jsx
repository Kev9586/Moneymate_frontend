import React from 'react';

const Select = ({ options, onSelect }) => {
  return (
    <select
      className="w-full rounded-lg border border-gray-300 px-4 py-2 transition-all duration-300 focus:border-primaryBlue focus:outline-none focus:ring-primaryBlue"
      onChange={(e) => onSelect(e.target.value)}
    >
      {options.map(option => (
        <option key={option.value} value={option.value}>{option.label}</option>
      ))}
    </select>
  );
};

export default Select;