import React, { useState, useEffect } from 'react';
import './PrzegladajWpisy.css';

function PrzegladajWpisy() {
  const [firmy, setFirmy] = useState([]);
  const [oddzialy, setOddzialy] = useState([]);
  const [wyrobiska, setWyrobiska] = useState([]);
  const [selectedFirma, setSelectedFirma] = useState('');
  const [selectedOddzial, setSelectedOddzial] = useState('');
  const [selectedWyrobisko, setSelectedWyrobisko] = useState('');
  const [selectedDate, setSelectedDate] = useState('');
  const [entries, setEntries] = useState({});

  // Set today's date as default
  useEffect(() => {
    const today = new Date().toISOString().split('T')[0];
    setSelectedDate(today);
  }, []);

  // Fetching list of firms
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

  // Fetching list of departments (oddzialy)
  useEffect(() => {
    const fetchOddzialy = async () => {
      if (!selectedFirma) {
        setOddzialy([]);
        return;
      }

      try {
        const response = await fetch(`http://localhost/get_oddzialy.php?firma=${selectedFirma}`);
        const data = await response.json();
        setOddzialy(data.oddzialy || []);
      } catch (error) {
        console.error('Błąd podczas pobierania oddziałów:', error);
      }
    };

    fetchOddzialy();
  }, [selectedFirma]);

  // Fetching list of wyrobiska
  useEffect(() => {
    const fetchWyrobiska = async () => {
      if (!selectedOddzial) {
        setWyrobiska([]);
        return;
      }

      try {
        const response = await fetch(`http://localhost/get_wyrobiska.php?oddzial=${selectedOddzial}`);
        const data = await response.json();
        setWyrobiska(data.wyrobiska || []);
      } catch (error) {
        console.error('Błąd podczas pobierania wyrobisk:', error);
      }
    };

    fetchWyrobiska();
  }, [selectedOddzial]);

  // Fetching entries (raporty) including wyrobisko
  const fetchEntries = async () => {
    if (!selectedOddzial || !selectedDate || !selectedWyrobisko) {
      console.warn('Oddział, wyrobisko i data są wymagane.');
      return;
    }

    try {
      const response = await fetch('http://localhost/get_entries.php', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          oddzial: selectedOddzial,
          wyrobisko: selectedWyrobisko,
          data: selectedDate,
        }),
      });
      const data = await response.json();
      if (response.ok) {
        setEntries(data.entries || {});
      } else {
        console.error('Błąd podczas pobierania wpisów:', data.message);
        setEntries({});
      }
    } catch (error) {
      console.error('Błąd podczas pobierania wpisów:', error);
    }
  };

  return (
    <div className="content-container">
      <h2>Przeglądaj wpisy</h2>
      <p>Wybierz firmę, oddział, wyrobisko i dzień, aby zobaczyć szczegóły raportów:</p>
      <div className="form-group">
        <label>Firma:</label>
        <select value={selectedFirma} onChange={(e) => setSelectedFirma(e.target.value)} required>
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
        <select value={selectedOddzial} onChange={(e) => setSelectedOddzial(e.target.value)} required>
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
        <select value={selectedWyrobisko} onChange={(e) => setSelectedWyrobisko(e.target.value)} required>
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
          value={selectedDate}
          onChange={(e) => setSelectedDate(e.target.value)}
          required
        />
      </div>
      <button className="fetch-button" onClick={fetchEntries}>
        Pokaż wpisy
      </button>
      <table className="entries-table">
        <thead>
          <tr>
            <th>Zmiana</th>
            <th>Wyrobisko</th>
            <th>Raport</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>I</td>
            <td>{entries['1']?.wyrobisko || '-'}</td>
            <td>{entries['1']?.tresc || '-'}</td>
          </tr>
          <tr>
            <td>II</td>
            <td>{entries['2']?.wyrobisko || '-'}</td>
            <td>{entries['2']?.tresc || '-'}</td>
          </tr>
          <tr>
            <td>III</td>
            <td>{entries['3']?.wyrobisko || '-'}</td>
            <td>{entries['3']?.tresc || '-'}</td>
          </tr>
          <tr>
            <td>IV</td>
            <td>{entries['4']?.wyrobisko || '-'}</td>
            <td>{entries['4']?.tresc || '-'}</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}

export default PrzegladajWpisy;
