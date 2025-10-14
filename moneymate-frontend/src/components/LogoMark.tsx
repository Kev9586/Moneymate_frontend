import React from 'react';

interface LogoMarkProps {
  className?: string;
}

const LogoMark: React.FC<LogoMarkProps> = ({ className }) => {
  return (
    <svg
      className={className}
      viewBox="0 0 100 100"
      xmlns="http://www.w3.org/2000/svg"
    >
      <circle cx="50" cy="50" r="48" stroke="#25D366" strokeWidth="4" fill="transparent" />
      <text x="50" y="50" textAnchor="middle" dy=".3em" fontSize="50" fill="#25D366" fontFamily="Poppins, sans-serif" fontWeight="bold">
        M
      </text>
    </svg>
  );
};

export default LogoMark;
