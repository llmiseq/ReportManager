import React, { useEffect, useState } from 'react';

function InformacjeOUserze() {
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Pobieranie ID sesji z localStorage
    const sessionId = localStorage.getItem('sessionId');
    if (!sessionId) {
      setError('Brak aktywnej sesji. Zaloguj się ponownie.');
      setLoading(false);
      return;
    }

    // Fetchowanie danych użytkownika z backendu
    fetch(`http://localhost/zok-user-info.php?sessionId=${sessionId}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include', // Przesyłanie ciasteczek
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error('Nie udało się połączyć z serwerem. Spróbuj ponownie później.');
        }
        return response.json();
      })
      .then((data) => {
        if (data.status === 'success') {
          setUserData(data.sessionData); // Ustawienie danych użytkownika
          console.log('Dane użytkownika:', data.sessionData); // Logowanie danych użytkownika w konsoli
        } else {
          setError(data.message || 'Błąd podczas pobierania danych użytkownika.');
        }
        setLoading(false);
      })
      .catch((error) => {
        setError(error.message || 'Nie udało się połączyć z serwerem.');
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <div>Ładowanie danych użytkownika...</div>;
  }

  if (error) {
    return <div className="error-popup">{error}</div>;
  }

  return (
    <div className="content-container">
      <h2>Informacje o użytkowniku</h2>
      {userData ? (
        <div className="user-details">
          <p><strong>Imię:</strong> {userData.imie}</p>
          <p><strong>Nazwisko:</strong> {userData.nazwisko}</p>
          <p><strong>Login:</strong> {userData.login}</p>
          <p><strong>Firma:</strong> {userData.firma}</p>
          <p><strong>Oddział:</strong> {userData.oddzial}</p>
          <p><strong>Ostatnia aktywność:</strong> {userData.last_activity}</p>
        </div>
      ) : (
        <p>Brak danych użytkownika.</p>
      )}
    </div>
  );
}

export default InformacjeOUserze;
