import React, { useState, useEffect } from 'react';

function SubUserPageUserInfo() {
  const [sessionData, setSessionData] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchSessionData = () => {
      const sessionId = localStorage.getItem('sessionId');
      console.log('Pobrano sessionId z localStorage:', sessionId);

      if (!sessionId) {
        setError('Brak identyfikatora sesji. Prosimy o ponowne zalogowanie.');
        return;
      }

      fetch(`http://localhost/getUserInfo.php?sessionId=${sessionId}`, {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
      })
        .then((response) => response.json())
        .then((data) => {
          console.log('Otrzymano odpowiedź z serwera:', data);
          if (data.status === 'success') {
            setSessionData(data.sessionData);
          } else {
            setError(data.message);
          }
        })
        .catch((error) => {
          console.error('Błąd podczas połączenia z serwerem:', error.message);
          setError('Nie udało się połączyć z serwerem.');
        });
    };

    fetchSessionData();
  }, []);

  const formatRole = (role) => {
    switch (role) {
      case 'user':
        return 'Pracownik';
      case 'auditor':
        return 'Audytor';
      case 'administrator':
        return 'Administrator';
      case 'superAdministrator':
        return 'Super Administrator';
      default:
        return 'Nieznana rola';
    }
  };

  const formatDate = (timestamp) => {
    const date = new Date(timestamp * 1000);
    return date.toLocaleString();
  };

  if (error) {
    return <div className="error-message">{error}</div>;
  }

  return (
    <div className="user-info-centered">
      <h2>Informacje o użytkowniku</h2>
      {sessionData ? (
        <div>
          <p><strong>Imię:</strong> {sessionData.name}</p>
          <p><strong>Nazwisko:</strong> {sessionData.surname}</p>
          <p><strong>Login:</strong> {sessionData.login}</p>
          <p><strong>Poziom uprawnień:</strong> {formatRole(sessionData.role)}</p>
          <p><strong>Ostatnia aktywność:</strong> {formatDate(sessionData.last_activity)}</p>
        </div>
      ) : (
        <p>Ładowanie danych użytkownika...</p>
      )}
    </div>
  );
}

export default SubUserPageUserInfo;
