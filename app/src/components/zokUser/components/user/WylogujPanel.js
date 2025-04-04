import React from 'react';
import './LogoutConfirmation.css';

function LogoutConfirmation({ onCancel }) {
  const handleLogout = () => {
    // Wylogowanie - przekierowanie na stronę logowania
    window.location.href = 'http://localhost:3000'; // Przekierowuje użytkownika do panelu logowania
  };

  return (
    <div className="logout-confirmation">
      <p>Czy na pewno chcesz się wylogować?</p>
      <div className="logout-buttons">
        <button onClick={handleLogout} className="logout-yes">Tak</button> {/* Wylogowanie */}
        <button onClick={onCancel} className="logout-no">Nie</button> {/* Anulowanie */}
      </div>
    </div>
  );
}

export default LogoutConfirmation;
