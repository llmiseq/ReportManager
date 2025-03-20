import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './UserPage.css';
import AccountManager from './UserPageComponents/subUserPage_accountManager';
import LogoutConfirmation from './UserPageComponents/subUserPage_logout';
import UserInfo from './UserPageComponents/subUserPage_userInfo';
import ReportAdder from './UserPageComponents/subUserPage_reportAdder';
import ReportsViewer from './UserPageComponents/subUserPage_myReport';

function UserPage() {
  const [selectedOption, setSelectedOption] = useState(''); // Wybrana opcja menu
  const [showLogoutConfirmation, setShowLogoutConfirmation] = useState(false); // Czy wyświetlić potwierdzenie wylogowania
  const [showChangePasswordForm, setShowChangePasswordForm] = useState(false); // Czy wyświetlić formularz zmiany hasła
  const [isAuthenticated, setIsAuthenticated] = useState(false); // Flaga autoryzacji użytkownika
  const navigate = useNavigate(); // Hook nawigacji

  useEffect(() => {
    console.log('Rozpoczęcie weryfikacji sesji i ról...');
    const sessionId = localStorage.getItem('sessionId');
    const role = localStorage.getItem('userRole'); // Pobierz rolę użytkownika

    console.log('sessionId z localStorage:', sessionId);
    console.log('Rola użytkownika z localStorage:', role);
    

    // Sprawdzanie obecności sesji i roli użytkownika
    if (!sessionId) {
      console.warn('Brak sessionId - użytkownik nie jest zalogowany. Przekierowuję na stronę logowania.');
      navigate('/'); // Przekierowanie na stronę logowania
    } else if (role !== 'user') { // Sprawdzanie roli użytkownika
      console.warn('Brak uprawnień - użytkownik nie jest zwykłym użytkownikiem. Przekierowuję do App.js.');
      navigate('/'); // Przekierowanie w przypadku braku uprawnień
    } else {
      console.log('Użytkownik zalogowany z odpowiednimi uprawnieniami.');
      setIsAuthenticated(true); // Ustawienie flagi autoryzacji
    }
  }, [navigate]);

  const handleOptionClick = (option) => {
    console.log(`Kliknięto opcję menu: ${option}`);
    setSelectedOption(option); // Zmiana wybranej opcji
    setShowLogoutConfirmation(option === 'Wyloguj'); // Wylogowanie
    setShowChangePasswordForm(option === 'Zarządzanie kontem'); // Zmiana hasła
  };

  const handleLogoutConfirm = () => {
    console.log('Potwierdzono wylogowanie. Czyszczenie danych sesji...');
    localStorage.removeItem('sessionId'); // Usuwanie sesji
    localStorage.removeItem('userRole'); // Usuwanie roli użytkownika
    console.log('sessionId i userRole zostały usunięte.');
    navigate('/'); // Przekierowanie do strony głównej
  };

  const handleLogoutCancel = () => {
    console.log('Anulowano wylogowanie.');
    setShowLogoutConfirmation(false); // Ukrycie potwierdzenia wylogowania
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
          <li onClick={() => handleOptionClick('Kreator raportów')}>Kreator raportów</li>
          <li onClick={() => handleOptionClick('Zarządzanie kontem')}>Zarządzanie kontem</li>
          <li className="logout" onClick={() => handleOptionClick('Wyloguj')}>Wyloguj</li>
        </ul>
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
        ) : (
          <p>{selectedOption ? `Wybrana opcja: ${selectedOption}` : 'Wybierz zakładkę z menu.'}</p>
        )}
      </div>
    </div>
  );
}

export default UserPage;
