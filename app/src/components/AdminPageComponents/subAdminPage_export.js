import React, { useState } from 'react';
import * as XLSX from 'xlsx';
import jsPDF from 'jspdf';
import 'jspdf-autotable';

function SubAdminPageExport() {
  const tables = ["urzadzenia", "roboty", "raporty"]; // Lista obsługiwanych tabel
  const [selectedTable, setSelectedTable] = useState(''); // Wybrana tabela

  const fetchAndExport = async (format) => {
    if (!selectedTable) {
      alert('Wybierz tabelę do eksportu!');
      return;
    }

    try {
      const response = await fetch('http://localhost/exportTable.php', {
        method: 'POST',
        mode: 'cors',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ tableName: selectedTable }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();

      if (data.status !== 'success') {
        throw new Error(data.message || 'Błąd w przetwarzaniu danych.');
      }

      if (format === 'xlsx') {
        const worksheet = XLSX.utils.json_to_sheet(data.data);
        const workbook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(workbook, worksheet, selectedTable);
        XLSX.writeFile(workbook, `${selectedTable}.xlsx`);
      } else if (format === 'pdf') {
        const doc = new jsPDF(); // Utwórz dokument PDF
        doc.text(`Tabela: ${selectedTable}`, 10, 10); // Dodaj tytuł
        doc.autoTable({
          head: [Object.keys(data.data[0])], // Generowanie nagłówków tabeli
          body: data.data.map((row) => Object.values(row)), // Generowanie zawartości tabeli
        });
        doc.save(`${selectedTable}.pdf`); // Pobierz PDF
      } else if (format === 'docx') {
        const htmlTable = `
          <table border="1" style="border-collapse: collapse; width: 100%;">
            <thead>
              <tr>${Object.keys(data.data[0])
                .map((key) => `<th>${key}</th>`)
                .join('')}</tr>
            </thead>
            <tbody>
              ${data.data
                .map((row) =>
                  `<tr>${Object.values(row)
                    .map((val) => `<td>${val}</td>`)
                    .join('')}</tr>`
                )
                .join('')}
            </tbody>
          </table>
        `;
        const blob = new Blob(['\ufeff', htmlTable], { type: 'application/msword' });
        const link = document.createElement('a');
        link.href = URL.createObjectURL(blob);
        link.setAttribute('download', `${selectedTable}.doc`);
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      }
    } catch (error) {
      console.error('Błąd podczas eksportu tabeli:', error);
      alert(`Nie udało się pobrać danych: ${error.message}`);
    }
  };

  return (
    <div>
      <h1>Eksportuj Tabelę</h1>
      <label>Wybierz tabelę:</label>
      <select value={selectedTable} onChange={(e) => setSelectedTable(e.target.value)}>
        <option value="">-- Wybierz tabelę --</option>
        {tables.map((table) => (
          <option key={table} value={table}>
            {table}
          </option>
        ))}
      </select>
      <div style={{ marginTop: '20px' }}>
        <button onClick={() => fetchAndExport('xlsx')} style={{ marginRight: '10px' }}>
          Eksportuj do Excel
        </button>
        <button onClick={() => fetchAndExport('docx')} style={{ marginRight: '10px' }}>
          Eksportuj do Word
        </button>
      </div>
    </div>
  );
}

export default SubAdminPageExport;
