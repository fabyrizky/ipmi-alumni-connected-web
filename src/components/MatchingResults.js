import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaStar, FaBriefcase, FaGlobeAmericas, FaGraduationCap, FaHeart } from 'react-icons/fa';
import { useApp } from '../context/AppContext';
import AIInsights from './AIInsights';
import NextSteps from './NextSteps';

const MatchingResults = () => {
  const { state } = useApp();
  const { matches, loading, error } = state;

  if (loading) {
    return (
      <div className="loading-container">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
          className="loading-spinner"
        />
        <p>Finding your perfect matches...</p>
      </div>
    );
  }

  if (error) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="error-container"
      >
        <p className="error-message">{error}</p>
      </motion.div>
    );
  }

  if (matches.length === 0) {
    return null;
  }

  return (
    <motion.section
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="results-section"
    >
      <div className="container">
        <h2 className="section-title">🤝 Your Alumni Matches</h2>
        
        <AnimatePresence>
          <div className="matches-grid">
            {matches.map((match, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                className="match-card"
                whileHover={{ y: -5, scale: 1.02 }}
              >
                <div className="match-header">
                  <h3 className="match-name">#{index + 1} {match.name}</h3>
                  <div className="similarity-score">
                    <FaStar />
                    <span>{Math.round(match.similarity * 100)}% Match</span>
                  </div>
                </div>
                
                <div className="match-details">
                  <div className="detail-item">
                    <FaBriefcase />
                    <span><strong>Profession:</strong> {match.profession}</span>
                  </div>
                  <div className="detail-item">
                    <FaGlobeAmericas />
                    <span><strong>Cultural Background:</strong> {match.culturalBackground}</span>
                  </div>
                  <div className="detail-item">
                    <FaGraduationCap />
                    <span><strong>Academic Background:</strong> {match.academicBackground}</span>
                  </div>
                  <div className="detail-item">
                    <FaHeart />
                    <span><strong>Interests:</strong> {match.interests}</span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </AnimatePresence>

        <AIInsights />
        <NextSteps />
      </div>
    </motion.section>
  );
};

export default MatchingResults;
