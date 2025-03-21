import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';
import LoginForm from './components/LoginForm';
import ReferentPage from './components/ReferentPage';
import UserPage from './components/UserPage';
import AdminPage from './components/AdminPage';
import SuperAdminPage from './components/SuperAdminPage';
import logo from './exme-logo.png'; // Import logo
import logo2 from './dalbis-logo.png'; // Import logo

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
          <header className="header">
            <img src={logo} alt="Exme Logo" className="app-logo" />
          </header>
          <Routes>
            <Route path="/referent" element={<ReferentPage />} />
            <Route path="/user" element={<UserPage />} />
            <Route path="/admin" element={<AdminPage />} />
            <Route path="/sadmin" element={<SuperAdminPage />} />
            <Route path="/" element={
              <>
                <LoginForm />
                <div className="theme-switch">
                <div className='kontenr_logo_dalbis'><img src={logo2} alt="Dalbis Logo" className="app2-logo" /></div>
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
