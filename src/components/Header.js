import React from 'react';
import { motion } from 'framer-motion';
import { FaGlobeAsia, FaUsers, FaRocket } from 'react-icons/fa';

const Header = () => {
  return (
    <header className="header">
      <motion.div
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6 }}
        className="header-content"
      >
        <div className="logo-section">
          <FaGlobeAsia className="logo-icon" />
          <h1 className="header-title">IPMI Alumni Networking Bridge</h1>
        </div>
        <p className="header-subtitle">
          AI-Powered Matchmaking for Meaningful Professional Connections
        </p>
        <div className="header-stats">
          <motion.div 
            className="stat-item"
            whileHover={{ scale: 1.05 }}
          >
            <FaUsers />
            <span>3,000+ Alumni</span>
          </motion.div>
          <motion.div 
            className="stat-item"
            whileHover={{ scale: 1.05 }}
          >
            <FaGlobeAsia />
            <span>Global Network</span>
          </motion.div>
          <motion.div 
            className="stat-item"
            whileHover={{ scale: 1.05 }}
          >
            <FaRocket />
            <span>AI-Powered</span>
          </motion.div>
        </div>
      </motion.div>
    </header>
  );
};

export default Header;
