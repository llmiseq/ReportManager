import React from 'react';

function SubSuperAdminPageLogout({ onConfirmLogout, onCancelLogout }) {
  return (
    <div className="logout-confirmation">
      <p>Czy na pewno chcesz się wylogować?</p>
      <button onClick={onConfirmLogout} className="logout-yes">Tak</button>
      <button onClick={onCancelLogout} className="logout-no">Nie</button>
    </div>
  );
}

export default SubSuperAdminPageLogout;
