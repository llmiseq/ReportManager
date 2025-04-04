import React from 'react';
import './WylogujPanel.css';

function WylogujPanel({ onConfirm, onCancel }) {
  const handleLogout = () => {
    window.location.href = 'http://localhost:3000'; // Przekierowanie na stronę logowania
  };

  return (
    <div className="logout-confirmation">
      <p>Czy na pewno chcesz się wylogować?</p>
      <div className="logout-buttons">
        <button onClick={handleLogout} className="logout-yes">Tak</button>
        <button onClick={onCancel} className="logout-no">Nie</button>
      </div>
    </div>
  );
}

export default WylogujPanel;
