import React from 'react';
import { motion } from 'framer-motion';
import { FaEnvelope, FaCoffee, FaHandshake, FaCalendar, FaLightbulb } from 'react-icons/fa';

const NextSteps = () => {
  const steps = [
    {
      icon: <FaEnvelope />,
      title: 'Send a personalized message',
      description: 'Mention shared interests from your matches'
    },
    {
      icon: <FaCoffee />,
      title: 'Suggest a virtual coffee chat',
      description: 'Explore collaboration opportunities'
    },
    {
      icon: <FaHandshake />,
      title: 'Propose a specific project',
      description: 'Find ways to work together'
    },
    {
      icon: <FaCalendar />,
      title: 'Join networking events',
      description: 'Connect around common interests'
    },
    {
      icon: <FaLightbulb />,
      title: 'Share industry insights',
      description: 'Start meaningful conversations'
    }
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.6 }}
      className="next-steps"
    >
      <h3 className="steps-title">📞 Next Steps</h3>
      <p className="steps-intro">Ready to connect? Here are proven ways to reach out:</p>
      
      <div className="steps-grid">
        {steps.map((step, index) => (
          <motion.div
            key={index}
            className="step-card"
            whileHover={{ scale: 1.05 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            <div className="step-icon">{step.icon}</div>
            <h4>{step.title}</h4>
            <p>{step.description}</p>
          </motion.div>
        ))}
      </div>
      
      <div className="pro-tip">
        <p>💫 <strong>Pro tip:</strong> The best networking starts with genuine curiosity about others' experiences and expertise.</p>
      </div>
    </motion.div>
  );
};

export default NextSteps;
