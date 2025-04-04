import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';
import LoginForm from './components/LoginForm';
import ReferentPage from './components/ReferentPage';
import UserPage from './components/UserPage';
import AdminPage from './components/AdminPage';
import SuperAdminPage from './components/SuperAdminPage';
import ZokAdminPage from './components/ZokAdminPage';
import ZokUserPage from './components/ZokUserPage';
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
  const [showDalbisLogo, setShowDalbisLogo] = useState(true); // Stan sterujący wyświetlaniem logo Dalbis

  useEffect(() => {
    setTimeout(() => {
      setShowLoadingScreen(false);
    }, 2000); // Wyświetlaj ekran ładowania przez 2 sekundy
  }, []);

  // Funkcja przekazywana do LoginForm, która umożliwia ukrycie logo Dalbis
  const toggleDalbisLogo = (isVisible) => {
    setShowDalbisLogo(isVisible);
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
            <Route path="/zokadmin" element={<ZokAdminPage />} />
            <Route path="/zokuser" element={<ZokUserPage />} />
            <Route
              path="/"
              element={
                <>
                  <LoginForm toggleDalbisLogo={toggleDalbisLogo} /> {/* Przekazanie funkcji do kontrolowania logo */}
                  <div className="theme-switch">
                    {showDalbisLogo && (
                      <div className="kontenr_logo_dalbis">
                        <img src={logo2} alt="Dalbis Logo" className="app2-logo" />
                      </div>
                    )}
                  </div>
                </>
              }
            />
          </Routes>
        </>
      )}
    </div>
  );
}

export default App;
