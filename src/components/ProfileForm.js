import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FaUser, FaGlobe, FaGraduationCap, FaHeart, FaSearch } from 'react-icons/fa';
import { useApp } from '../context/AppContext';
import { actionTypes } from '../context/appReducer';
import MatchingService from '../services/MatchingService';

const ProfileForm = () => {
  const { state, dispatch } = useApp();
  const [formData, setFormData] = useState(state.userProfile);
  const [errors, setErrors] = useState({});

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
    
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({
        ...prev,
        [field]: ''
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.profession.trim()) {
      newErrors.profession = 'Profession is required';
    }
    if (!formData.culturalBackground.trim()) {
      newErrors.culturalBackground = 'Cultural background is required';
    }
    if (!formData.academicBackground.trim()) {
      newErrors.academicBackground = 'Academic background is required';
    }
    if (!formData.interests.trim()) {
      newErrors.interests = 'Interests are required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    dispatch({ type: actionTypes.SET_USER_PROFILE, payload: formData });
    dispatch({ type: actionTypes.SET_LOADING, payload: true });
    dispatch({ type: actionTypes.CLEAR_RESULTS });

    try {
      const matches = await MatchingService.findMatches(formData);
      dispatch({ type: actionTypes.SET_MATCHES, payload: matches });
      
      // Get AI insights
      const insights = await MatchingService.getAIInsights(formData, matches);
      dispatch({ type: actionTypes.SET_AI_INSIGHTS, payload: insights });
      
    } catch (error) {
      dispatch({ 
        type: actionTypes.SET_ERROR, 
        payload: 'Failed to find matches. Please try again.' 
      });
    }
  };

  const inputFields = [
    {
      id: 'profession',
      label: 'Profession',
      icon: <FaUser />,
      placeholder: 'e.g., Data Scientist, Entrepreneur, Consultant',
      type: 'text'
    },
    {
      id: 'culturalBackground',
      label: 'Cultural Background',
      icon: <FaGlobe />,
      placeholder: 'e.g., Indonesian, American, Multi-cultural',
      type: 'text'
    },
    {
      id: 'academicBackground',
      label: 'Academic Background',
      icon: <FaGraduationCap />,
      placeholder: 'e.g., MBA, Computer Science, Business Administration',
      type: 'text'
    },
    {
      id: 'interests',
      label: 'Interests & Goals',
      icon: <FaHeart />,
      placeholder: 'e.g., Innovation, sustainability, startup ecosystems, mentoring',
      type: 'textarea'
    }
  ];

  return (
    <motion.section
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.2 }}
      className="profile-form-section"
    >
      <div className="container">
        <h2 className="section-title">Build Your Professional Profile</h2>
        <form onSubmit={handleSubmit} className="profile-form">
          <div className="form-grid">
            {inputFields.map((field) => (
              <motion.div
                key={field.id}
                className="form-group"
                whileHover={{ scale: 1.02 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <label htmlFor={field.id} className="form-label">
                  {field.icon}
                  {field.label}
                </label>
                {field.type === 'textarea' ? (
                  <textarea
                    id={field.id}
                    value={formData[field.id]}
                    onChange={(e) => handleInputChange(field.id, e.target.value)}
                    placeholder={field.placeholder}
                    className={`form-input ${errors[field.id] ? 'error' : ''}`}
                    rows="4"
                  />
                ) : (
                  <input
                    type={field.type}
                    id={field.id}
                    value={formData[field.id]}
                    onChange={(e) => handleInputChange(field.id, e.target.value)}
                    placeholder={field.placeholder}
                    className={`form-input ${errors[field.id] ? 'error' : ''}`}
                  />
                )}
                {errors[field.id] && (
                  <span className="error-message">{errors[field.id]}</span>
                )}
              </motion.div>
            ))}
          </div>
          
          <motion.button
            type="submit"
            disabled={state.loading}
            className="submit-button"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <FaSearch />
            {state.loading ? 'Finding Matches...' : 'Find My Matches'}
          </motion.button>
        </form>
      </div>
    </motion.section>
  );
};

export default ProfileForm;
