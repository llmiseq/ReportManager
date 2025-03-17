import React, { useState, useEffect } from 'react';
import './AdminPage.css';
import AccountManager from './AdminPageComponents/subAdminPage_accountManager';
import LogoutConfirmation from './AdminPageComponents/subAdminPage_logout';
import UserManager from './AdminPageComponents/subAdminPage_userManager';

function AdminPage() {
  const [isLoading, setIsLoading] = useState(true);
  const [selectedOption, setSelectedOption] = useState('');
  const [showLogoutConfirmation, setShowLogoutConfirmation] = useState(false);
  const [showChangePasswordForm, setShowChangePasswordForm] = useState(false);
  const [showAddUserForm, setShowAddUserForm] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 2000);
    return () => clearTimeout(timer);
  }, []);

  const handleOptionClick = (option) => {
    setSelectedOption(option);
    setShowLogoutConfirmation(option === 'Wyloguj');
    setShowChangePasswordForm(option === 'Zarządzanie kontem');
    setShowAddUserForm(option === 'Dodawanie użytkowników');
  };

  const handleLogoutConfirm = () => {
    window.location.href = '/'; // Przekierowanie do strony głównej
  };

  const handleLogoutCancel = () => {
    setShowLogoutConfirmation(false);
  };

  if (isLoading) {
    return (
      <div className="loading-screen">
        <div className="loading-dots">
          <span className="dot"></span>
          <span className="dot"></span>
          <span className="dot"></span>
        </div>
        <h2>Ładowanie...</h2>
      </div>
    );
  }

  return (
    <div className="page-container light">
      <nav className="menu-sidebar">
        <ul className="menu-list">
        <li onClick={() => handleOptionClick('Informacje o użytkowniku')}>Informacje o użytkowniku</li>
          <li onClick={() => handleOptionClick('Dodawanie użytkowników')}>Dodawanie użytkowników</li>
          <li onClick={() => handleOptionClick('Dodawanie robót')}>Dodawanie robót</li>
          <li onClick={() => handleOptionClick('Dodawanie urządzeń')}>Dodawanie urządzeń</li>
          <li onClick={() => handleOptionClick('Przeglądaj raporty')}>Przeglądaj raporty</li>
          <li onClick={() => handleOptionClick('Dodaj raport')}>Dodaj raport</li>
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
        ) : (
          <p>{selectedOption ? `Wybrana zakładka: ${selectedOption}` : 'Wybierz zakładkę z menu.'}</p>
        )}
      </div>
    </div>
  );
}

export default AdminPage;
