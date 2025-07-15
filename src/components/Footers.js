import React from 'react';
import { motion } from 'framer-motion';
import { FaHeart, FaGithub, FaLinkedin } from 'react-icons/fa';

const Footer = () => {
  return (
    <motion.footer
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6, delay: 0.8 }}
      className="footer"
    >
      <div className="container">
        <div className="footer-content">
          <div className="footer-stats">
            <div className="stat">
              <span className="stat-number">3,000+</span>
              <span className="stat-label">Alumni</span>
            </div>
            <div className="stat">
              <span className="stat-number">50+</span>
              <span className="stat-label">Countries</span>
            </div>
            <div className="stat">
              <span className="stat-number">100+</span>
              <span className="stat-label">Professions</span>
            </div>
          </div>
          
          <div className="footer-links">
            <a href="https://github.com" target="_blank" rel="noopener noreferrer">
              <FaGithub />
            </a>
            <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer">
              <FaLinkedin />
            </a>
          </div>
        </div>
        
        <div className="footer-bottom">
          <p>
            🎓 <strong>IPMI Alumni Networking Bridge</strong> | Connecting Alumni Worldwide
          </p>
          <p>
            Built with <FaHeart className="heart-icon" /> for meaningful professional connections
          </p>
        </div>
      </div>
    </motion.footer>
  );
};

export default Footer;
