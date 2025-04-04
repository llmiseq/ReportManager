import React, { useState } from 'react';
import './GenerujRaport.css';

function GenerujRaport() {
  const [selectedDate, setSelectedDate] = useState(''); // State for selected date

  const handleDateChange = (e) => {
    setSelectedDate(e.target.value); // Aktualizacja daty
  };

  const handleGenerateReport = async () => {
    if (!selectedDate) {
      alert('Proszę wybrać datę do wygenerowania raportu.');
      return;
    }

    try {
      const response = await fetch('http://localhost/generate_report.php', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ date: selectedDate }), // Przesyłanie wybranej daty do backendu
      });

      if (response.ok) {
        const blob = await response.blob();
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `Raport_${selectedDate}.csv`; // Zmieniono rozszerzenie na .csv
        a.click();
        window.URL.revokeObjectURL(url);
      } else {
        alert('Nie udało się wygenerować raportu. Spróbuj ponownie później.');
      }
    } catch (error) {
      console.error('Błąd podczas generowania raportu:', error);
      alert('Wystąpił problem podczas generowania raportu. Spróbuj ponownie później.');
    }
  };

  return (
    <div className="content-container">
      <h2>Generuj raport</h2>
      <p>Wybierz dzień, z którego chcesz wygenerować raport.</p>
      <form className="form-generuj-raport">
        <div className="form-group">
          <label>Data:</label>
          <input
            type="date"
            value={selectedDate}
            onChange={handleDateChange}
            required
          />
        </div>
        <button
          type="button"
          className="generate-button"
          onClick={handleGenerateReport}
        >
          Generuj Raport
        </button>
      </form>
    </div>
  );
}

export default GenerujRaport;
