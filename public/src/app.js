import React, { Suspense, lazy } from 'react';
import { motion } from 'framer-motion';
import ErrorBoundary from './components/ErrorBoundary';
import LoadingSpinner from './components/LoadingSpinner';
import './styles/App.css';

// Lazy loading components for better performance
const Header = lazy(() => import('./components/Header'));
const ProfileForm = lazy(() => import('./components/ProfileForm'));
const MatchingResults = lazy(() => import('./components/MatchingResults'));
const Footer = lazy(() => import('./components/Footer'));

function App() {
  return (
    <ErrorBoundary>
      <div className="App">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="app-container"
        >
          <Suspense fallback={<LoadingSpinner />}>
            <Header />
            <main className="main-content">
              <ProfileForm />
              <MatchingResults />
            </main>
            <Footer />
          </Suspense>
        </motion.div>
      </div>
    </ErrorBoundary>
  );
}

export default App;
