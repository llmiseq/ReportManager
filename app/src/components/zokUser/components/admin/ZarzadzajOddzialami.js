import React, { useState, useEffect } from 'react';
import './ZarzadzajOddzialami.css'; // Upewnij się, że istnieje odpowiedni plik CSS

function ZarzadzajOddzialami() {
  const [nazwaOddzialu, setNazwaOddzialu] = useState(''); // Stan dla nazwy oddziału
  const [firmy, setFirmy] = useState([]); // Lista firm pobranych z backendu
  const [wybranaFirma, setWybranaFirma] = useState(''); // Wybrana firma
  const [errorMessage, setErrorMessage] = useState(''); // Komunikat błędu
  const [successMessage, setSuccessMessage] = useState(''); // Komunikat sukcesu

  // Pobieranie listy firm z backendu
  useEffect(() => {
    const fetchFirmy = async () => {
      try {
        const response = await fetch('http://localhost/get_firmy.php'); // Endpoint backendu
        const data = await response.json();

        if (response.ok && data.status === 'success') {
          setFirmy(data.firmy || []);
          setErrorMessage('');
        } else {
          setErrorMessage(data.message || 'Nie udało się pobrać listy firm.');
        }
      } catch (error) {
        console.error('Błąd podczas pobierania firm:', error);
        setErrorMessage('Nie udało się pobrać firm. Spróbuj ponownie później.');
      }
    };

    fetchFirmy();
  }, []);

  const handleChangeOddzial = (e) => {
    setNazwaOddzialu(e.target.value); // Aktualizacja nazwy oddziału
  };

  const handleChangeFirma = (e) => {
    setWybranaFirma(e.target.value); // Aktualizacja wybranej firmy
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage('');
    setSuccessMessage('');

    if (!nazwaOddzialu.trim() || !wybranaFirma.trim()) {
      setErrorMessage('Nazwa oddziału i wybór firmy są wymagane.');
      return;
    }

    try {
      const response = await fetch('http://localhost/add_oddzial.php', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ nazwa: nazwaOddzialu, firma: wybranaFirma }), // Wysyłanie nazwy oddziału i firmy
      });

      const result = await response.json();

      if (response.ok && result.status === 'success') {
        setSuccessMessage('Oddział został pomyślnie dodany!');
        setNazwaOddzialu('');
        setWybranaFirma('');
      } else {
        setErrorMessage(result.message || 'Wystąpił błąd podczas dodawania oddziału.');
      }
    } catch (error) {
      console.error('Błąd połączenia z serwerem:', error);
      setErrorMessage('Nie udało się połączyć z serwerem. Spróbuj ponownie później.');
    }
  };

  return (
    <div className="content-container">
      <h2>Zarządzaj oddziałami</h2>
      <p>Wprowadź nazwę nowego oddziału i wybierz firmę, do której ma należeć.</p>
      <form onSubmit={handleSubmit} className="form-zarzadzaj-oddzialami">
        <div className="form-group">
          <label>Firma:</label>
          <select
            value={wybranaFirma}
            onChange={handleChangeFirma}
            required
          >
            <option value="">Wybierz firmę</option>
            {firmy.map((firma, index) => (
              <option key={index} value={firma}>
                {firma}
              </option>
            ))}
          </select>
        </div>
        <div className="form-group">
          <label>Nazwa Oddziału:</label>
          <input
            type="text"
            value={nazwaOddzialu}
            onChange={handleChangeOddzial}
            placeholder="Wpisz nazwę oddziału"
            required
          />
        </div>
        <button type="submit" className="submit-button">Dodaj Oddział</button>
      </form>
      {errorMessage && <p className="error-message">{errorMessage}</p>}
      {successMessage && <p className="success-message">{successMessage}</p>}
    </div>
  );
}

export default ZarzadzajOddzialami;
