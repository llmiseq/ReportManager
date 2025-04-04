import React, { useState } from 'react';
import './EksportujDane.css';

function EksportujDane() {
  const [selectedTable, setSelectedTable] = useState(''); // Wybrana tabela

  const handleTableChange = (e) => {
    setSelectedTable(e.target.value); // Aktualizacja wybranej tabeli
  };

  const handleExport = async () => {
    if (!selectedTable) {
      alert('Proszę wybrać tabelę do eksportu.');
      return;
    }

    try {
      const response = await fetch('http://localhost/export_table.php', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ tableName: selectedTable }), // Przesyłanie nazwy tabeli do backendu
      });

      if (response.ok) {
        const blob = await response.blob();
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `${selectedTable}_export.csv`; // Nazwa pliku CSV
        a.click();
        window.URL.revokeObjectURL(url);
      } else {
        alert('Nie udało się wyeksportować danych. Spróbuj ponownie później.');
      }
    } catch (error) {
      console.error('Błąd podczas eksportu:', error);
      alert('Wystąpił błąd podczas eksportu. Spróbuj ponownie później.');
    }
  };

  return (
    <div className="content-container">
      <h2>Eksportuj dane</h2>
      <p>Wybierz tabelę, którą chcesz wyeksportować jako CSV.</p>
      <form className="form-eksportuj-dane">
        <div className="form-group">
          <label>Tabela:</label>
          <select
            value={selectedTable}
            onChange={handleTableChange}
            required
          >
            <option value="">Wybierz tabelę</option>
            <option value="firmy">Firmy</option>
            <option value="oddzialy">Oddziały</option>
            <option value="raporty_zok">Raporty</option>
            <option value="uzytkownicy">Użytkownicy</option>
            <option value="wyrobiska">Wyrobiska</option>
          </select>
        </div>
        <div className="export-buttons">
          <button
            type="button"
            className="export-button"
            onClick={handleExport}
          >
            Eksportuj CSV
          </button>
        </div>
      </form>
    </div>
  );
}

export default EksportujDane;
