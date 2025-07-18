import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';

const root = ReactDOM.createRoot(document.getElementById('root'));

try {
  root.render(
    <React.StrictMode>
      <App />
    </React.StrictMode>
  );
} catch (error) {
  console.error('Error rendering app:', error);
  root.render(
    <div style={{
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      height: '100vh',
      color: 'white',
      textAlign: 'center',
      padding: '2rem'
    }}>
      <div>
        <h1>🌐 IPMI Alumni Networking</h1>
        <p>Loading application...</p>
      </div>
    </div>
  );
}
