import React, { createContext, useContext, useReducer } from 'react';
import appReducer from './appReducer';

const AppContext = createContext();

const initialState = {
  userProfile: {
    profession: '',
    culturalBackground: '',
    academicBackground: '',
    interests: ''
  },
  matches: [],
  loading: false,
  error: null,
  aiInsights: null
};

export const AppProvider = ({ children }) => {
  const [state, dispatch] = useReducer(appReducer, initialState);

  return (
    <AppContext.Provider value={{ state, dispatch }}>
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
