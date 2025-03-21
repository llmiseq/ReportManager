import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './ReferentPage.css';
import AccountManager from './ReferentPageComponents/subReferentPage_accountManager';
import Logout from './ReferentPageComponents/subReferentPage_logout';
import SubUserPageUserInfo from './ReferentPageComponents/subReferentPage_userInfo';
import ReportViewer from './ReferentPageComponents/subReferentPage_reportViewer';
import logo from './dalbis-logo.png';


function ReferentPage() {
  const [selectedOption, setSelectedOption] = useState('');
  const [showLogoutConfirmation, setShowLogoutConfirmation] = useState(false);
  const [showChangePasswordForm, setShowChangePasswordForm] = useState(false);
  const [showUserInfo, setShowUserInfo] = useState(false);
  const [showReportViewer, setShowReportViewer] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false); // Flaga autoryzacji
  const navigate = useNavigate();

  // Weryfikacja sesji i roli użytkownika
  useEffect(() => {
    console.log('Rozpoczęcie weryfikacji sesji i ról...');
    const sessionId = localStorage.getItem('sessionId');
    const role = localStorage.getItem('userRole'); // Pobierz rolę użytkownika

    console.log('sessionId z localStorage:', sessionId);
    console.log('Rola użytkownika z localStorage:', role);

    // Sprawdzanie obecności sesji i zgodności roli użytkownika
    if (!sessionId) {
      console.warn('Brak sessionId - użytkownik nie jest zalogowany. Przekierowuję na stronę logowania.');
      navigate('/'); // Przekierowanie na stronę logowania
    } else if (role !== 'auditor') { // Sprawdzanie roli użytkownika
      console.warn('Brak uprawnień - użytkownik nie jest audytorem. Przekierowuję do App.js.');
      navigate('/'); // Przekierowanie w przypadku braku uprawnień
    } else {
      console.log('Użytkownik zalogowany z odpowiednimi uprawnieniami.');
      setIsAuthenticated(true); // Ustawienie flagi autoryzacji
    }
  }, [navigate]);

  const handleOptionClick = (option) => {
    console.log(`Kliknięto opcję menu: ${option}`);
    setSelectedOption(option);
    setShowLogoutConfirmation(option === 'Wyloguj');
    setShowChangePasswordForm(option === 'Zarządzanie kontem');
    setShowUserInfo(option === 'Informacje o użytkowniku');
    setShowReportViewer(option === 'Raporty');
  };

  const handleLogoutConfirm = () => {
    console.log('Potwierdzono wylogowanie. Czyszczenie danych sesji...');
    localStorage.removeItem('sessionId'); // Usuwanie sesji
    localStorage.removeItem('userRole'); // Usuwanie roli użytkownika
    console.log('sessionId i userRole zostały usunięte.');
    navigate('/'); // Przekierowanie do strony głównej
  };

  if (!isAuthenticated) {
    console.log('Użytkownik nie jest zalogowany lub nie ma odpowiednich uprawnień.');
    return <p>Sprawdzanie autoryzacji...</p>;
  }

  return (
    <div className="page-container light">
      <nav className="menu-sidebar">
        <ul className="menu-list">
          <li onClick={() => handleOptionClick('Informacje o użytkowniku')}>Informacje o użytkowniku</li>
          <li onClick={() => handleOptionClick('Raporty')}>Raporty</li>
          <li onClick={() => handleOptionClick('Zarządzanie kontem')}>Zarządzanie kontem</li>
          <li className="logout" onClick={() => setShowLogoutConfirmation(true)}>Wyloguj</li>
        </ul>
        <img src={logo} alt="Logo Dolne" className="footer-logo" />
      </nav>
      <div className="content-display">
        {showLogoutConfirmation ? (
          <Logout
            onConfirmLogout={handleLogoutConfirm} // Użycie funkcji handleLogoutConfirm
            onCancelLogout={() => setShowLogoutConfirmation(false)} // Bezpośrednie zamknięcie potwierdzenia
          />
        ) : showChangePasswordForm ? (
          <AccountManager />
        ) : showUserInfo ? (
          <SubUserPageUserInfo />
        ) : showReportViewer ? (
          <ReportViewer />
        ) : (
          <p>{selectedOption ? `Wybrana opcja: ${selectedOption}` : 'Wybierz zakładkę z menu.'}</p>
        )}
      </div>
    </div>
  );
}

export default ReferentPage;
