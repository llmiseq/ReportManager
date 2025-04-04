import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './UserPage.css';
import AccountManager from './UserPageComponents/subUserPage_accountManager';
import LogoutConfirmation from './UserPageComponents/subUserPage_logout';
import UserInfo from './UserPageComponents/subUserPage_userInfo';
import ReportAdder from './UserPageComponents/subUserPage_reportAdder';
import ReportsViewer from './UserPageComponents/subUserPage_myReport';
import Dashboard from './UserPageComponents/subUserPage_dashboard';
import logo from './dalbis-logo.png';

function UserPage() {
  const [selectedOption, setSelectedOption] = useState(''); // Wybrana opcja menu
  const [showLogoutConfirmation, setShowLogoutConfirmation] = useState(false); // Czy wyświetlić potwierdzenie wylogowania
  const [showChangePasswordForm, setShowChangePasswordForm] = useState(false); // Czy wyświetlić formularz zmiany hasła
  const [isAuthenticated, setIsAuthenticated] = useState(false); // Flaga autoryzacji użytkownika
  const navigate = useNavigate(); // Hook nawigacji

  useEffect(() => {
    const sessionId = localStorage.getItem('sessionId');
    const role = localStorage.getItem('userRole'); // Pobierz rolę użytkownika

    if (!sessionId) {
      navigate('/'); // Przekierowanie na stronę logowania
    } else if (role !== 'user') {
      navigate('/'); // Przekierowanie w przypadku braku uprawnień
    } else {
      setIsAuthenticated(true); // Ustawienie flagi autoryzacji
    }
  }, [navigate]);

  const handleOptionClick = (option) => {
    setSelectedOption(option); // Zmiana wybranej opcji
    setShowLogoutConfirmation(option === 'Wyloguj'); // Wylogowanie
    setShowChangePasswordForm(option === 'Zarządzanie kontem'); // Zmiana hasła
  };

  const handleLogoutConfirm = () => {
    localStorage.removeItem('sessionId'); // Usuwanie sesji
    localStorage.removeItem('userRole'); // Usuwanie roli użytkownika
    navigate('/'); // Przekierowanie do strony głównej
  };

  const handleLogoutCancel = () => {
    setShowLogoutConfirmation(false); // Ukrycie potwierdzenia wylogowania
  };

  if (!isAuthenticated) {
    return <p>Sprawdzanie autoryzacji...</p>;
  }

  return (
    <div className="page-container light">
      <nav className="menu-sidebar">
        <ul className="menu-list">
          <li onClick={() => handleOptionClick('Informacje o użytkowniku')}>Informacje o użytkowniku</li>
          <li onClick={() => handleOptionClick('Raporty')}>Raporty</li>
          <li onClick={() => handleOptionClick('Kreator raportów')}>Kreator raportów</li>
          <li onClick={() => handleOptionClick('Panel Główny')}>Panel Główny</li>
          <li onClick={() => handleOptionClick('Zarządzanie kontem')}>Zarządzanie kontem</li>
          <li className="logout" onClick={() => handleOptionClick('Wyloguj')}>Wyloguj</li>
        </ul>
        <img src={logo} alt="Logo Dolne" className="footer-logo" />
      </nav>
  
      <div className="content-display">
        {showLogoutConfirmation ? (
          <LogoutConfirmation
            onConfirm={handleLogoutConfirm}
            onCancel={handleLogoutCancel}
          />
        ) : showChangePasswordForm ? (
          <AccountManager />
        ) : selectedOption === 'Informacje o użytkowniku' ? (
          <UserInfo />
        ) : selectedOption === 'Raporty' ? (
          <ReportsViewer />
        ) : selectedOption === 'Kreator raportów' ? (
          <ReportAdder />
        ) : selectedOption === 'Panel Główny' ? (
          <Dashboard />
        ) : (
          <p>{selectedOption ? `Wybrana opcja: ${selectedOption}` : 'Wybierz zakładkę z menu.'}</p>
        )}
      </div>
    </div>
  );  
}

export default UserPage;
