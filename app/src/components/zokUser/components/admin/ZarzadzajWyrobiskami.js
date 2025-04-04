import React, { useState, useEffect } from 'react';
import './ZarzadzajWyrobiskami.css';

function ZarzadzajWyrobiskami() {
  const [nazwaWyrobiska, setNazwaWyrobiska] = useState(''); // Stan dla nazwy wyrobiska
    const [lokalizacje, setLokalizacje] = useState([]); // Stan dla lokalizacji (dynamicznie pobranych)
    const [wybranaLokalizacja, setWybranaLokalizacja] = useState(''); // Wybrana lokalizacja
    const [errorMessage, setErrorMessage] = useState('');
    const [successMessage, setSuccessMessage] = useState('');
  
    // Pobieranie lokalizacji z API
    useEffect(() => {
      const fetchLokalizacje = async () => {
        try {
          const response = await fetch('http://localhost/get_robot_locations.php'); // Zmień na prawdziwy endpoint
          const data = await response.json();
          setLokalizacje(data.locations || []); // Załóżmy, że odpowiedź zawiera pole `locations`
        } catch (error) {
          console.error('Błąd podczas pobierania lokalizacji:', error);
          setErrorMessage('Nie udało się pobrać lokalizacji. Spróbuj ponownie później.');
        }
      };
  
      fetchLokalizacje();
    }, []);
  
    const handleSubmit = async (e) => {
      e.preventDefault();
      setErrorMessage('');
      setSuccessMessage('');
  
      if (!nazwaWyrobiska || !wybranaLokalizacja) {
        setErrorMessage('Proszę uzupełnić wszystkie pola!');
        return;
      }
  
      try {
        const response = await fetch('http://localhost/add_mine.php', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            nazwaWyrobiska,
            lokalizacja: wybranaLokalizacja,
          }),
        });
  
        const result = await response.json();
        if (response.ok && result.status === 'success') {
          setSuccessMessage('Wyrobisko zostało pomyślnie dodane!');
          setNazwaWyrobiska('');
          setWybranaLokalizacja('');
        } else {
          setErrorMessage(result.message || 'Wystąpił błąd podczas dodawania wyrobiska.');
        }
      } catch (error) {
        console.error('Błąd połączenia z serwerem:', error);
        setErrorMessage('Nie udało się połączyć z serwerem. Spróbuj ponownie później.');
      }
    };
  
    return (
      <div className="content-container">
        <h2>Dodaj wyrobisko</h2>
        <p>Wprowadź szczegóły wyrobiska.</p>
        <form onSubmit={handleSubmit} className="form-dodaj-wyrobisko">
          <div className="form-group">
            <label>Nazwa wyrobiska:</label>
            <input
              type="text"
              value={nazwaWyrobiska}
              onChange={(e) => setNazwaWyrobiska(e.target.value)}
              placeholder="Wpisz nazwę wyrobiska"
              required
            />
          </div>
          <div className="form-group">
            <label>Lokalizacja:</label>
            <select
              value={wybranaLokalizacja}
              onChange={(e) => setWybranaLokalizacja(e.target.value)}
              required
            >
              <option value="">Wybierz lokalizację</option>
              {lokalizacje.map((lokalizacja, index) => (
                <option key={index} value={lokalizacja}>
                  {lokalizacja}
                </option>
              ))}
            </select>
          </div>
          <button type="submit" className="submit-button">Dodaj Wyrobisko</button>
        </form>
        {errorMessage && <p className="error-message">{errorMessage}</p>}
        {successMessage && <p className="success-message">{successMessage}</p>}
      </div>
    );
  }

export default ZarzadzajWyrobiskami;
