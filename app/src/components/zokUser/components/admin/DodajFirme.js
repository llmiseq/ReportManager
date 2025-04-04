import React, { useState } from 'react';
import './DodajFirme.css';

function DodajFirme() {
  const [nazwaFirmy, setNazwaFirmy] = useState(''); // Stan dla nazwy firmy
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleChange = (e) => {
    setNazwaFirmy(e.target.value); // Aktualizacja nazwy firmy
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSuccessMessage('');
    setErrorMessage('');

    if (!nazwaFirmy.trim()) {
      setErrorMessage('Nazwa firmy jest wymagana!');
      return;
    }

    try {
      const response = await fetch('http://localhost/add_firme.php', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ nazwa: nazwaFirmy }),
      });

      const result = await response.json();
      if (response.ok && result.status === 'success') {
        setSuccessMessage('Firma została pomyślnie dodana!');
        setNazwaFirmy(''); // Czyszczenie pola tekstowego
      } else {
        setErrorMessage(result.message || 'Wystąpił błąd podczas dodawania firmy.');
      }
    } catch (error) {
      console.error('Błąd połączenia z serwerem:', error);
      setErrorMessage('Nie udało się połączyć z serwerem. Spróbuj ponownie później.');
    }
  };

  return (
    <div className="content-container">
      <h2>Dodaj firmę</h2>
      <p>Wprowadź nazwę nowej firmy, którą chcesz dodać.</p>
      <form onSubmit={handleSubmit} className="form-dodaj-firme">
        <div className="form-group">
          <label>Nazwa firmy:</label>
          <input
            type="text"
            value={nazwaFirmy}
            onChange={handleChange}
            placeholder="Wpisz nazwę firmy"
            required
          />
        </div>
        <button type="submit" className="submit-button">Dodaj firmę</button>
      </form>
      {successMessage && <p className="success-message">{successMessage}</p>}
      {errorMessage && <p className="error-message">{errorMessage}</p>}
    </div>
  );
}

export default DodajFirme;
