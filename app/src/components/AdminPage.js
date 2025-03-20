import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './AdminPage.css';
import AccountManager from './AdminPageComponents/subAdminPage_accountManager';
import LogoutConfirmation from './AdminPageComponents/subAdminPage_logout';
import UserManager from './AdminPageComponents/subAdminPage_userManager';
import SubAdminPageUserInfo from './AdminPageComponents/subAdminPage_userInfo';
import AdminReportViewer from './AdminPageComponents/subAdminPage_raportViewer';
import SubAdminPageReportAdder from './AdminPageComponents/subAdminPage_reportAdder';
import SubAdminPageWorkManager from './AdminPageComponents/subAdminPage_workManager';
import SubAdminPageMachineAdder from './AdminPageComponents/subAdminPage_machineAdder';

function AdminPage() {
  const [selectedOption, setSelectedOption] = useState('');
  const [showLogoutConfirmation, setShowLogoutConfirmation] = useState(false);
  const [showChangePasswordForm, setShowChangePasswordForm] = useState(false);
  const [showAddUserForm, setShowAddUserForm] = useState(false);
  const [showUserInfo, setShowUserInfo] = useState(false);
  const [showReportViewer, setShowReportViewer] = useState(false);
  const [showReportAdder, setShowReportAdder] = useState(false);
  const [showWorkManager, setShowWorkManager] = useState(false);
  const [showMachineAdder, setShowMachineAdder] = useState(false);
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
    } else if (role !== 'administrator') { // Sprawdzanie roli użytkownika
      console.warn('Brak uprawnień - użytkownik nie jest administratorem. Przekierowuję do App.js.');
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
    setShowAddUserForm(option === 'Dodawanie użytkowników');
    setShowUserInfo(option === 'Informacje o użytkowniku');
    setShowReportViewer(option === 'Przeglądaj raporty');
    setShowReportAdder(option === 'Dodaj raport');
    setShowWorkManager(option === 'Dodawanie robót');
    setShowMachineAdder(option === 'Dodawanie urządzeń');
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
          <li onClick={() => handleOptionClick('Dodawanie użytkowników')}>Dodawanie użytkowników</li>
          <li onClick={() => handleOptionClick('Dodawanie robót')}>Dodawanie robót</li>
          <li onClick={() => handleOptionClick('Dodawanie urządzeń')}>Dodawanie urządzeń</li>
          <li onClick={() => handleOptionClick('Dodaj raport')}>Dodaj raport</li>
          <li onClick={() => handleOptionClick('Przeglądaj raporty')}>Przeglądaj raporty</li>
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
        ) : showAddUserForm ? (
          <UserManager />
        ) : showWorkManager ? (
          <SubAdminPageWorkManager />
        ) : showMachineAdder ? (
          <SubAdminPageMachineAdder />
        ) : showUserInfo ? (
          <SubAdminPageUserInfo />
        ) : showReportViewer ? (
          <AdminReportViewer />
        ) : showReportAdder ? (
          <SubAdminPageReportAdder />
        ) : (
          <p>{selectedOption ? `Wybrana zakładka: ${selectedOption}` : 'Wybierz zakładkę z menu.'}</p>
        )}
      </div>
    </div>
  );
}

export default AdminPage;
