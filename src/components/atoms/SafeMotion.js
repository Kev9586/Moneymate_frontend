import React from 'react';
import { motion } from 'framer-motion';

const SafeMotion = ({ children, ...props }) => {
  try {
    // Attempt to render the motion component
    return <motion.div {...props}>{children}</motion.div>;
  } catch (error) {
    // If it fails, log the error and render a simple div as a fallback
    console.error("Framer Motion failed to render:", error);
    return <div>{children}</div>;
  }
};

export default SafeMotion;