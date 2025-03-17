import React, { useState } from 'react';
import './UserPage.css';
import AccountManager from './UserPageComponents/subUserPage_accountManager';
import LogoutConfirmation from './UserPageComponents/subUserPage_logout';

function UserPage() {
  const [selectedOption, setSelectedOption] = useState('');
  const [showLogoutConfirmation, setShowLogoutConfirmation] = useState(false);
  const [showChangePasswordForm, setShowChangePasswordForm] = useState(false);

  const handleOptionClick = (option) => {
    setSelectedOption(option);
    setShowLogoutConfirmation(option === 'Wyloguj');
    setShowChangePasswordForm(option === 'Zarządzanie kontem');
  };

  const handleLogoutConfirm = () => {
    window.location.href = '/'; // Przekierowanie do strony głównej
  };

  const handleLogoutCancel = () => {
    setShowLogoutConfirmation(false);
  };

  return (
    <div className="page-container light">
      <nav className="menu-sidebar">
        <ul className="menu-list">
          <li onClick={() => handleOptionClick('Informacje o użytkowniku')}>Informacje o użytkowniku</li>
          <li onClick={() => handleOptionClick('Moje raporty')}>Moje raporty</li>
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
        ) : (
          <p>{selectedOption ? `Wybrana opcja: ${selectedOption}` : 'Wybierz zakładkę z menu.'}</p>
        )}
      </div>
    </div>
  );
}

export default UserPage;
