import React from 'react';

export const Heading = ({ children, size = "lg" }) => (
  <h2 className={`font-semibold text-${size} text-primaryBlue`}>{children}</h2>
);