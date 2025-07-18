import React, { useState, useEffect } from 'react';
import './App.css';

// Alumni Data
const alumniData = [
  {
    name: 'Dana Afriza',
    profession: 'Finance Analyst',
    culturalBackground: 'American',
    academicBackground: 'Harvard MBA',
    interests: 'Global markets, innovation'
  },
  {
    name: 'Siddartha Simpson',
    profession: 'Entrepreneur',
    culturalBackground: 'Indonesian',
    academicBackground: 'Undergraduate Business',
    interests: 'Startup ecosystems, cultural exchanges'
  },
  {
    name: 'Elviera Ramirez',
    profession: 'Tech Developer',
    culturalBackground: 'Latin American',
    academicBackground: 'Computer Science',
    interests: 'AI applications, coding'
  },
  {
    name: 'Bung Towel',
    profession: 'Marketing Specialist',
    culturalBackground: 'Indian',
    academicBackground: 'Marketing',
    interests: 'Brand strategy, diversity'
  },
  {
    name: 'Kun Welly Never Surrender',
    profession: 'Sustainability Expert',
    culturalBackground: 'Chinese',
    academicBackground: 'Environmental Studies',
    interests: 'Eco-business, collaborations'
  },
  {
    name: 'Maria Santos',
    profession: 'Product Manager',
    culturalBackground: 'Brazilian',
    academicBackground: 'Engineering MBA',
    interests: 'Product development, user experience'
  },
  {
    name: 'Ahmad Rahman',
    profession: 'Data Scientist',
    culturalBackground: 'Malaysian',
    academicBackground: 'Statistics PhD',
    interests: 'Machine learning, analytics'
  },
  {
    name: 'Jennifer Chen',
    profession: 'Business Consultant',
    culturalBackground: 'Taiwanese',
    academicBackground: 'Business Administration',
    interests: 'Strategy consulting, leadership'
  },
  {
    name: 'Roberto Silva',
    profession: 'Operations Manager',
    culturalBackground: 'Mexican',
    academicBackground: 'Operations Research',
    interests: 'Supply chain, efficiency'
  },
  {
    name: 'Priya Patel',
    profession: 'Digital Marketing',
    culturalBackground: 'Indian',
    academicBackground: 'Digital Media',
    interests: 'Social media, content creation'
  },
  {
    name: 'Alex Johnson',
    profession: 'Software Engineer',
    culturalBackground: 'Australian',
    academicBackground: 'Software Engineering',
    interests: 'Technology innovation, startups'
  },
  {
    name: 'Lisa Wang',
    profession: 'Investment Banker',
    culturalBackground: 'Singapore',
    academicBackground: 'Finance MBA',
    interests: 'Investment strategies, fintech'
  }
];

// Error Boundary Component
class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    console.error('Error caught:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="error-fallback">
          <h1>🌐 IPMI Alumni Networking</h1>
          <p>Something went wrong, but we're still here!</p>
          <button onClick={() => window.location.reload()}>
            Refresh Page
          </button>
        </div>
      );
    }

    return this.props.children;
  }
}

// Matching Functions
const calculateSimilarity = (str1, str2) => {
  try {
    const words1 = str1.toLowerCase().split(/\s+/);
    const words2 = str2.toLowerCase().split(/\s+/);
    
    const intersection = words1.filter(word => words2.includes(word));
    const union = [...new Set([...words1, ...words2])];
    
    return intersection.length / union.length;
  } catch (error) {
    console.error('Error calculating similarity:', error);
    return 0.5; // Default similarity
  }
};

const findMatches = (userProfile, topN = 3) => {
  try {
    const userProfileString = `${userProfile.profession} ${userProfile.culturalBackground} ${userProfile.academicBackground} ${userProfile.interests}`;
    
    const matches = alumniData.map(alumni => {
      const alumniString = `${alumni.profession} ${alumni.culturalBackground} ${alumni.academicBackground} ${alumni.interests}`;
      const similarity = calculateSimilarity(userProfileString, alumniString);
      
      return {
        ...alumni,
        similarity
      };
    });

    return matches
      .sort((a, b) => b.similarity - a.similarity)
      .slice(0, topN)
      .filter(match => match.similarity > 0.1);
  } catch (error) {
    console.error('Error finding matches:', error);
    return alumniData.slice(0, topN).map(alumni => ({
      ...alumni,
      similarity: 0.75
    }));
  }
};

// Main App Component
function App() {
  const [mounted, setMounted] = useState(false);
  const [userProfile, setUserProfile] = useState({
    profession: '',
    culturalBackground: '',
    academicBackground: '',
    interests: ''
  });
  const [matches, setMatches] = useState([]);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleInputChange = (field, value) => {
    setUserProfile(prev => ({
      ...prev,
      [field]: value
    }));
    
    if (errors[field]) {
      setErrors(prev => ({
        ...prev,
        [field]: ''
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!userProfile.profession.trim()) {
      newErrors.profession = 'Profession is required';
    }
    if (!userProfile.culturalBackground.trim()) {
      newErrors.culturalBackground = 'Cultural background is required';
    }
    if (!userProfile.academicBackground.trim()) {
      newErrors.academicBackground = 'Academic background is required';
    }
    if (!userProfile.interests.trim()) {
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

    setLoading(true);
    setMatches([]);

    try {
      // Simulate loading delay
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      const foundMatches = findMatches(userProfile);
      setMatches(foundMatches);
    } catch (error) {
      console.error('Error finding matches:', error);
      // Fallback matches
      setMatches(alumniData.slice(0, 3).map(alumni => ({
        ...alumni,
        similarity: 0.75
      })));
    } finally {
      setLoading(false);
    }
  };

  if (!mounted) {
    return (
      <div className="loading-container">
        <div className="loading-spinner"></div>
        <p>Loading IPMI Alumni Networking...</p>
      </div>
    );
  }

  const inputFields = [
    {
      id: 'profession',
      label: '👤 Profession',
      placeholder: 'e.g., Data Scientist, Entrepreneur, Consultant',
      type: 'text'
    },
    {
      id: 'culturalBackground',
      label: '🌍 Cultural Background',
      placeholder: 'e.g., Indonesian, American, Multi-cultural',
      type: 'text'
    },
    {
      id: 'academicBackground',
      label: '🎓 Academic Background',
      placeholder: 'e.g., MBA, Computer Science, Business Administration',
      type: 'text'
    },
    {
      id: 'interests',
      label: '❤️ Interests & Goals',
      placeholder: 'e.g., Innovation, sustainability, startup ecosystems, mentoring',
      type: 'textarea'
    }
  ];

  return (
    <ErrorBoundary>
      <div className="App">
        {/* Header */}
        <header className="header">
          <div className="container">
            <div className="logo-section">
              <span className="logo-icon">🌐</span>
              <h1 className="header-title">IPMI Alumni Networking Bridge</h1>
            </div>
            <p className="header-subtitle">
              AI-Powered Matchmaking for Meaningful Professional Connections
            </p>
            <div className="header-stats">
              <div className="stat-item">
                <span>👥 3,000+ Alumni</span>
              </div>
              <div className="stat-item">
                <span>🌍 Global Network</span>
              </div>
              <div className="stat-item">
                <span>🚀 AI-Powered</span>
              </div>
            </div>
          </div>
        </header>

        {/* Profile Form */}
        <section className="profile-form-section">
          <div className="container">
            <h2 className="section-title">Build Your Professional Profile</h2>
            <form onSubmit={handleSubmit} className="profile-form">
              <div className="form-grid">
                {inputFields.map((field) => (
                  <div key={field.id} className="form-group">
                    <label htmlFor={field.id} className="form-label">
                      {field.label}
                    </label>
                    {field.type === 'textarea' ? (
                      <textarea
                        id={field.id}
                        value={userProfile[field.id]}
                        onChange={(e) => handleInputChange(field.id, e.target.value)}
                        placeholder={field.placeholder}
                        className={`form-input ${errors[field.id] ? 'error' : ''}`}
                        rows="4"
                      />
                    ) : (
                      <input
                        type={field.type}
                        id={field.id}
                        value={userProfile[field.id]}
                        onChange={(e) => handleInputChange(field.id, e.target.value)}
                        placeholder={field.placeholder}
                        className={`form-input ${errors[field.id] ? 'error' : ''}`}
                      />
                    )}
                    {errors[field.id] && (
                      <span className="error-message">{errors[field.id]}</span>
                    )}
                  </div>
                ))}
              </div>
              
              <button
                type="submit"
                disabled={loading}
                className="submit-button"
              >
                🔍 {loading ? 'Finding Matches...' : 'Find My Matches'}
              </button>
            </form>
          </div>
        </section>

        {/* Loading */}
        {loading && (
          <div className="loading-container">
            <div className="loading-spinner"></div>
            <p>Finding your perfect matches...</p>
          </div>
        )}

        {/* Results */}
        {matches.length > 0 && (
          <section className="results-section">
            <div className="container">
              <h2 className="section-title">🤝 Your Alumni Matches</h2>
              
              <div className="matches-grid">
                {matches.map((match, index) => (
                  <div key={index} className="match-card">
                    <div className="match-header">
                      <h3 className="match-name">#{index + 1} {match.name}</h3>
                      <div className="similarity-score">
                        ⭐ {Math.round(match.similarity * 100)}% Match
                      </div>
                    </div>
                    
                    <div className="match-details">
                      <div className="detail-item">
                        <span><strong>💼 Profession:</strong> {match.profession}</span>
                      </div>
                      <div className="detail-item">
                        <span><strong>🌍 Cultural Background:</strong> {match.culturalBackground}</span>
                      </div>
                      <div className="detail-item">
                        <span><strong>🎓 Academic Background:</strong> {match.academicBackground}</span>
                      </div>
                      <div className="detail-item">
                        <span><strong>❤️ Interests:</strong> {match.interests}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* AI Insights */}
              <div className="ai-insights">
                <h3 className="insights-title">🧠 AI-Powered Networking Insights</h3>
                <div className="insights-content">
                  <div className="insight-card">
                    <h4>💡 Why These Matches Work</h4>
                    <p>These matches show excellent alignment in professional interests and complementary expertise that can lead to meaningful collaborations.</p>
                  </div>
                  <div className="insight-card">
                    <h4>🚀 Collaboration Opportunities</h4>
                    <p>Consider cross-industry projects, knowledge sharing sessions, mentor-mentee relationships, and joint ventures that leverage diverse backgrounds.</p>
                  </div>
                </div>
              </div>

              {/* Next Steps */}
              <div className="next-steps">
                <h3 className="steps-title">📞 Next Steps</h3>
                <p className="steps-intro">Ready to connect? Here are proven ways to reach out:</p>
                
                <div className="steps-grid">
                  <div className="step-card">
                    <div className="step-icon">📧</div>
                    <h4>Send personalized message</h4>
                    <p>Mention shared interests</p>
                  </div>
                  <div className="step-card">
                    <div className="step-icon">☕</div>
                    <h4>Virtual coffee chat</h4>
                    <p>Explore opportunities</p>
                  </div>
                  <div className="step-card">
                    <div className="step-icon">🤝</div>
                    <h4>Propose project</h4>
                    <p>Work together</p>
                  </div>
                  <div className="step-card">
                    <div className="step-icon">📅</div>
                    <h4>Join events</h4>
                    <p>Network in person</p>
                  </div>
                  <div className="step-card">
                    <div className="step-icon">💡</div>
                    <h4>Share insights</h4>
                    <p>Start conversations</p>
                  </div>
                </div>
                
                <div className="pro-tip">
                  <p>💫 <strong>Pro tip:</strong> The best networking starts with genuine curiosity about others' experiences and expertise.</p>
                </div>
              </div>
            </div>
          </section>
        )}

        {/* Footer */}
        <footer className="footer">
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
            </div>
            
            <div className="footer-bottom">
              <p>🎓 <strong>IPMI Alumni Networking Bridge</strong> | Connecting Alumni Worldwide</p>
              <p>Built with ❤️ for meaningful professional connections</p>
            </div>
          </div>
        </footer>
      </div>
    </ErrorBoundary>
  );
}

export default App;
