import React from 'react';

function LogoutConfirmation({ onConfirm, onCancel }) {
  return (
    <div className="logout-confirmation">
      <p>Czy na pewno chcesz się wylogować?</p>
      <button onClick={onConfirm} className="logout-yes">Tak</button>
      <button onClick={onCancel} className="logout-no">Nie</button>
    </div>
  );
}

export default LogoutConfirmation;
