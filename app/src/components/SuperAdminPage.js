import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './SuperAdminPage.css';
import SubSuperAdminPageLogout from './SuperAdminPageComponents/subSuperAdminPage_logout';
import SubSuperAdminPageAccountManager from './SuperAdminPageComponents/subSuperAdminPage_accountManager';
import SubSuperAdminPageUserInfo from './SuperAdminPageComponents/subSuperAdminPage_userInfo';
import SubSuperAdminPageMachineManager from './SuperAdminPageComponents/subSuperAdminPage_machineManager';
import SubSuperAdminPageReportManager from './SuperAdminPageComponents/subSuperAdminPage_reportManager';
import SubSuperAdminPageUserManager from './SuperAdminPageComponents/subSuperAdminPage_userManager';
import SubSuperAdminPageWorkManager from './SuperAdminPageComponents/subSuperAdminPage_workManager';
import SubSuperAdminPageExport from './SuperAdminPageComponents/subSuperAdminPage_export'; // Import komponentu Eksportu

function SuperAdminPage() {
  const [selectedOption, setSelectedOption] = useState('');
  const [showLogoutConfirmation, setShowLogoutConfirmation] = useState(false);
  const [showChangePasswordForm, setShowChangePasswordForm] = useState(false);
  const [showUserInfo, setShowUserInfo] = useState(false);
  const [showUserManager, setShowUserManager] = useState(false);
  const [showMachineManager, setShowMachineManager] = useState(false);
  const [showReportManager, setShowReportManager] = useState(false);
  const [showWorkManager, setShowWorkManager] = useState(false);
  const [showExportData, setShowExportData] = useState(false); // Dodano stan dla eksportu danych
  const [isAuthenticated, setIsAuthenticated] = useState(false); // Flaga autoryzacji
  const navigate = useNavigate();

  useEffect(() => {
    console.log('Rozpoczęcie weryfikacji sesji i ról...');
    const sessionId = localStorage.getItem('sessionId');
    const role = localStorage.getItem('userRole'); // Pobierz rolę użytkownika

    console.log('sessionId z localStorage:', sessionId);
    console.log('Rola użytkownika z localStorage:', role);

    // Sprawdzanie obecności sesji
    if (!sessionId) {
      console.warn('Brak sessionId - użytkownik nie jest zalogowany. Przekierowuję na stronę logowania.');
      navigate('/'); // Przekierowanie na stronę logowania
    } else if (role !== 'superAdministrator') { // Sprawdzanie roli użytkownika
      console.warn('Brak uprawnień - użytkownik nie jest super administratorem. Przekierowuję do App.js.');
      navigate('/'); // Przekierowanie, jeśli rola nie pasuje
    } else {
      console.log('Użytkownik zalogowany z odpowiednimi uprawnieniami.');
      setIsAuthenticated(true);
    }
  }, [navigate]);

  const handleOptionClick = (option) => {
    console.log(`Kliknięto opcję menu: ${option}`);
    setSelectedOption(option);
    setShowLogoutConfirmation(option === 'Wyloguj');
    setShowChangePasswordForm(option === 'Zarządzanie kontem');
    setShowUserInfo(option === 'Informacje o użytkowniku');
    setShowUserManager(option === 'Zarządzanie użytkownikami');
    setShowMachineManager(option === 'Zarządzanie urządzeń');
    setShowReportManager(option === 'Zarządzanie raportami');
    setShowWorkManager(option === 'Zarządzanie robotami');
    setShowExportData(option === 'Eksportuj dane'); // Aktywacja eksportu danych
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
    setShowLogoutConfirmation(false);
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
          <li onClick={() => handleOptionClick('Zarządzanie użytkownikami')}>Zarządzanie użytkownikami</li>
          <li onClick={() => handleOptionClick('Zarządzanie robotami')}>Zarządzanie robotami</li>
          <li onClick={() => handleOptionClick('Zarządzanie urządzeń')}>Zarządzanie urządzeń</li>
          <li onClick={() => handleOptionClick('Zarządzanie raportami')}>Zarządzanie raportami</li>
          <li onClick={() => handleOptionClick('Eksportuj dane')}>Eksportuj dane</li> {/* Dodano opcję eksportu danych */}
          <li onClick={() => handleOptionClick('Zarządzanie kontem')}>Zarządzanie kontem</li>
          <li className="logout" onClick={() => handleOptionClick('Wyloguj')}>Wyloguj</li>
        </ul>
      </nav>

      <div className="content-display">
        {showLogoutConfirmation ? (
          <SubSuperAdminPageLogout
            onConfirmLogout={handleLogoutConfirm}
            onCancelLogout={handleLogoutCancel}
          />
        ) : showChangePasswordForm ? (
          <SubSuperAdminPageAccountManager />
        ) : showUserInfo ? (
          <SubSuperAdminPageUserInfo />
        ) : showUserManager ? (
          <SubSuperAdminPageUserManager />
        ) : showMachineManager ? (
          <SubSuperAdminPageMachineManager />
        ) : showReportManager ? (
          <SubSuperAdminPageReportManager />
        ) : showWorkManager ? (
          <SubSuperAdminPageWorkManager />
        ) : showExportData ? (
          <SubSuperAdminPageExport /> // Renderowanie komponentu eksportu danych
        ) : (
          <p>{selectedOption ? `Wybrana opcja: ${selectedOption}` : 'Wybierz zakładkę z menu.'}</p>
        )}
      </div>
    </div>
  );
}

export default SuperAdminPage;
