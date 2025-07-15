import React from 'react';
import { motion } from 'framer-motion';

const LoadingSpinner = () => {
  return (
    <div className="loading-spinner-container">
      <motion.div
        animate={{
          rotate: 360,
        }}
        transition={{
          duration: 1,
          repeat: Infinity,
          ease: "linear"
        }}
        className="spinner"
      />
      <p>Loading amazing connections...</p>
    </div>
  );
};

export default LoadingSpinner;
