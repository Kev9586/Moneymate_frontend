import React from 'react';

export const Heading = ({ children, size = "lg" }) => {
  const sizeClasses = {
    '2xl': 'text-2xl',
    'lg': 'text-lg',
    'base': 'text-base',
    'sm': 'text-sm',
  };
  return (
    <h2 className={`${sizeClasses[size]} font-semibold text-blue-500`}>{children}</h2>
  );
};