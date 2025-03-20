import React from 'react';

function Logout({ onCancel }) {
  return (
    <div className="logout-confirmation">
      <p>Czy na pewno chcesz się wylogować?</p>
      <button onClick={() => (window.location.href = '/')} className="logout-yes">Tak</button>
      <button onClick={onCancel} className="logout-no">Nie</button>
    </div>
  );
}

export default Logout;
