import React, { useState, useEffect } from 'react';
import './DodajWpis.css';

function DodajWpis() {
  const [firmy, setFirmy] = useState([]); // Lista firm
  const [oddzialy, setOddzialy] = useState([]); // Lista oddziałów
  const [wyrobiska, setWyrobiska] = useState([]); // Lista wyrobisk
  const [formData, setFormData] = useState({
    firma: '',
    oddzial: '',
    wyrobisko: '', // Wybrany wyrobisko
    data: '', // Automatycznie wstawiana data
    zmiana: '',
    tresc: '',
  });
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  // Dynamiczna zamiana „lite fi” na „φ”
const handleTrescChange = (e) => {
  const { name, value } = e.target;
  const newValue = name === 'tresc' ? value.replace(/fii/gi, 'Ø') : value;
  setFormData((prev) => ({
    ...prev,
    [name]: newValue,
  }));
};


  // Ustawienie dzisiejszej daty przy załadowaniu komponentu
  useEffect(() => {
    const today = new Date().toISOString().split('T')[0]; // Format daty: YYYY-MM-DD
    setFormData((prev) => ({
      ...prev,
      data: today,
    }));
  }, []);

  // Pobieranie listy firm
  useEffect(() => {
    const fetchFirmy = async () => {
      try {
        const response = await fetch('http://localhost/get_firmy.php');
        const data = await response.json();
        setFirmy(data.firmy || []);
      } catch (error) {
        console.error('Błąd podczas pobierania firm:', error);
      }
    };

    fetchFirmy();
  }, []);

  // Pobieranie listy oddziałów po wybraniu firmy
  useEffect(() => {
    const fetchOddzialy = async () => {
      if (!formData.firma) {
        setOddzialy([]);
        return;
      }

      try {
        const response = await fetch(`http://localhost/get_oddzialy.php?firma=${formData.firma}`);
        const data = await response.json();
        setOddzialy(data.oddzialy || []);
      } catch (error) {
        console.error('Błąd podczas pobierania oddziałów:', error);
      }
    };

    fetchOddzialy();
  }, [formData.firma]);

  // Pobieranie listy wyrobisk po wybraniu oddziału
  useEffect(() => {
    const fetchWyrobiska = async () => {
      if (!formData.oddzial) {
        setWyrobiska([]);
        return;
      }

      try {
        const response = await fetch(`http://localhost/get_wyrobiska.php?oddzial=${formData.oddzial}`);
        const data = await response.json();
        setWyrobiska(data.wyrobiska || []);
      } catch (error) {
        console.error('Błąd podczas pobierania wyrobisk:', error);
      }
    };

    fetchWyrobiska();
  }, [formData.oddzial]);

  // Obsługa wysyłania formularza
  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage('');
    setSuccessMessage('');

    if (!formData.firma || !formData.oddzial || !formData.wyrobisko || !formData.data || !formData.zmiana || !formData.tresc) {
      setErrorMessage('Wszystkie pola są wymagane!');
      console.log('Nie wszystkie pola zostały wypełnione:', formData);
      return;
    }

    try {
      console.log('Dane wysyłane na backend:', JSON.stringify(formData));

      const response = await fetch('http://localhost/add_entry.php', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const result = await response.json();
      if (response.ok && result.status === 'success') {
        setSuccessMessage('Wpis został pomyślnie dodany!');
        setFormData({
          firma: '',
          oddzial: '',
          wyrobisko: '',
          data: new Date().toISOString().split('T')[0],
          zmiana: '',
          tresc: '',
        });
      } else {
        setErrorMessage(result.message || 'Wystąpił błąd podczas dodawania wpisu.');
        console.log('Błąd z backendu:', result);
      }
    } catch (error) {
      console.error('Błąd połączenia z serwerem:', error);
      setErrorMessage('Nie udało się połączyć z serwerem. Spróbuj ponownie później.');
    }
  };

  return (
    <div className="content-container">
      <h2>Dodaj wpis</h2>
      <p>Wprowadź dane nowego wpisu do systemu.</p>
      <form onSubmit={handleSubmit} className="form-dodaj-wpis">
        <div className="form-group">
          <label>Firma:</label>
          <select name="firma" value={formData.firma} onChange={handleTrescChange} required>
            <option value="">Wybierz firmę</option>
            {firmy.map((firma, index) => (
              <option key={index} value={firma}>
                {firma}
              </option>
            ))}
          </select>
        </div>
        <div className="form-group">
          <label>Oddział:</label>
          <select name="oddzial" value={formData.oddzial} onChange={handleTrescChange} required>
            <option value="">Wybierz oddział</option>
            {oddzialy.map((oddzial, index) => (
              <option key={index} value={oddzial}>
                {oddzial}
              </option>
            ))}
          </select>
        </div>
        <div className="form-group">
          <label>Wyrobisko:</label>
          <select name="wyrobisko" value={formData.wyrobisko} onChange={handleTrescChange} required>
            <option value="">Wybierz wyrobisko</option>
            {wyrobiska.map((wyrobisko, index) => (
              <option key={index} value={wyrobisko}>
                {wyrobisko}
              </option>
            ))}
          </select>
        </div>
        <div className="form-group">
          <label>Data:</label>
          <input
            type="date"
            name="data"
            value={formData.data}
            onChange={handleTrescChange}
            required
          />
        </div>
        <div className="form-group">
          <label>Zmiana:</label>
          <select name="zmiana" value={formData.zmiana} onChange={handleTrescChange} required>
            <option value="">Wybierz zmianę</option>
            <option value="1">I</option>
            <option value="2">II</option>
            <option value="3">III</option>
            <option value="4">IV</option>
          </select>
        </div>
        <div className="form-group">
          <label>Treść:</label>
          <textarea
            name="tresc"
            value={formData.tresc}
            onChange={handleTrescChange}
            placeholder="Wpisz treść wpisu"
            required
          />
        </div>
        <button type="submit" className="submit-button">Dodaj Wpis</button>
      </form>
      {errorMessage && <p className="error-message">{errorMessage}</p>}
      {successMessage && <p className="success-message">{successMessage}</p>}
    </div>
  );
}

export default DodajWpis;
