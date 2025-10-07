import React from 'react';

const InputField = ({ type = 'text', placeholder, error = false }) => {
  const baseStyles = 'w-full px-4 py-2 rounded-lg border focus:outline-none transition-all duration-300';
  const errorStyles = 'border-alertRed focus:ring-alertRed';
  const defaultStyles = 'border-gray-300 focus:ring-primaryBlue focus:border-primaryBlue';

  return (
    <input
      type={type}
      placeholder={placeholder}
      className={`${baseStyles} ${error ? errorStyles : defaultStyles}`}
    />
  );
};

export default InputField;