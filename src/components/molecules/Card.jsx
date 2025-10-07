import React from 'react';

const Card = ({ children, className = '' }) => {
  return (
    <div className={`rounded-xl bg-white p-6 shadow-soft ${className}`}>
      {children}
    </div>
  );
};

export default Card;