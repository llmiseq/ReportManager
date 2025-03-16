import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';
import AdminPage from './components/AdminPage';
import UserPage from './components/UserPage';
import LoginForm from './components/LoginForm';

function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}

function AppContent() {
  const [isDarkMode, setIsDarkMode] = useState(true);
  const [showLoadingScreen, setShowLoadingScreen] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setShowLoadingScreen(false);
    }, 2000); // Wyświetlaj ekran ładowania przez 2 sekundy
  }, []);

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
  };

  return (
    <div className={`App ${isDarkMode ? 'dark' : 'light'}`}>
      {showLoadingScreen ? (
        <div className="loading-screen">
          <div className="loading-dots">
            <span className="dot"></span>
            <span className="dot"></span>
            <span className="dot"></span>
          </div>
          <h2>Ładowanie...</h2>
        </div>
      ) : (
        <>
          <Routes>
            <Route path="/admin" element={<AdminPage />} />
            <Route path="/user" element={<UserPage />} />
            <Route path="/" element={
              <>
                <LoginForm />
                <div className="theme-switch">
                  <label htmlFor="theme-switch">Zmiana motywu:</label>
                  <div className="switch" onClick={toggleTheme}>
                    <div className="slider"></div>
                  </div>
                </div>
              </>
            } />
          </Routes>
        </>
      )}
    </div>
  );
}

export default App;
