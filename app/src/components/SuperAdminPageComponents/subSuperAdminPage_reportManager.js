import React, { useState, useEffect } from 'react';
import './subSuperAdminPage_reportManager.css';

function SubSuperAdminPageReportManager() {
  const [reports, setReports] = useState([]);
  const [filteredReports, setFilteredReports] = useState([]);
  const [expandedRow, setExpandedRow] = useState(null);
  const [editingReport, setEditingReport] = useState(null); // Edytowany raport
  const [roboty, setRoboty] = useState([]);
  const [urzadzenia, setUrzadzenia] = useState([]);
  const [filterColumn, setFilterColumn] = useState('roboty');
  const [filterText, setFilterText] = useState('');
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [sortConfig, setSortConfig] = useState({ key: null, direction: 'ascending' });

  // Pobranie listy robót i urządzeń
  useEffect(() => {
    fetch("http://localhost/getRoboty.php")
      .then((response) => response.json())
      .then((data) => {
        if (data.status === "success") {
          setRoboty(data.roboty);
        }
      })
      .catch((error) => console.error("Błąd pobierania robót:", error));

    fetch("http://localhost/getUrzadzenia.php")
      .then((response) => response.json())
      .then((data) => {
        if (data.status === "success") {
          setUrzadzenia(data.urzadzenia);
        }
      })
      .catch((error) => console.error("Błąd pobierania urządzeń:", error));
  }, []);

  // Pobranie raportów
  useEffect(() => {
    fetch('http://localhost/getReports.php', {
      method: 'POST',
      credentials: 'include',
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.status === 'success') {
          setReports(data.reports);
          setFilteredReports(data.reports);
        } else {
          setError(data.message || 'Wystąpił błąd podczas pobierania raportów.');
        }
      })
      .catch(() => setError('Nie udało się połączyć z serwerem.'));
  }, []);

  const handleFilter = () => {
    const filtered = reports.filter((report) =>
      String(report[filterColumn]).toLowerCase().includes(filterText.toLowerCase())
    );
    setFilteredReports(filtered);
  };

  const clearFilter = () => {
    setFilterText('');
    setFilteredReports(reports);
  };

  const toggleRow = (id_raportu) => {
    setExpandedRow(expandedRow === id_raportu ? null : id_raportu);
  };

  const startEditing = (report) => {
    setEditingReport(report);
  };

  const saveEditedReport = () => {
    fetch(`http://localhost/updateReport.php`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(editingReport),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.status === 'success') {
          setReports((prev) =>
            prev.map((report) =>
              report.id_raportu === editingReport.id_raportu ? editingReport : report
            )
          );
          setFilteredReports((prev) =>
            prev.map((report) =>
              report.id_raportu === editingReport.id_raportu ? editingReport : report
            )
          );
          setSuccessMessage('Raport został pomyślnie zaktualizowany.');
          setEditingReport(null);
        } else {
          setError(data.message || 'Wystąpił błąd podczas aktualizacji raportu.');
        }
      })
      .catch(() => setError('Nie udało się połączyć z serwerem.'));
  };

  const sortReports = (key) => {
    const direction =
      sortConfig.key === key && sortConfig.direction === 'ascending'
        ? 'descending'
        : 'ascending';

    const sortedReports = [...filteredReports].sort((a, b) => {
      let valueA = a[key];
      let valueB = b[key];

      if (key === 'glebokosc') {
        valueA = parseFloat(valueA);
        valueB = parseFloat(valueB);
      }

      if (valueA < valueB) {
        return direction === 'ascending' ? -1 : 1;
      }
      if (valueA > valueB) {
        return direction === 'ascending' ? 1 : -1;
      }
      return 0;
    });

    setFilteredReports(sortedReports);
    setSortConfig({ key, direction });
  };

  return (
    <div className="reports-manager-container">
      <h1>Zarządzanie Raportami</h1>
      {error && <p className="error">{error}</p>}
      {successMessage && <p className="success">{successMessage}</p>}

      <div className="filter-container">
        <select value={filterColumn} onChange={(e) => setFilterColumn(e.target.value)}>
          <option value="roboty">Roboty</option>
          <option value="urzadzenia">Urządzenia</option>
          <option value="data">Data</option>
          <option value="zmiana">Zmiana</option>
          <option value="wiertacz">Wiertacz</option>
          <option value="pomocnicy">Pomocnicy</option>
          <option value="tresc_raportu">Treść</option>
          <option value="glebokosc">Głębokość</option>
        </select>
        <input
          type="text"
          placeholder="Wpisz słowa kluczowe..."
          value={filterText}
          onChange={(e) => setFilterText(e.target.value)}
        />
        <button onClick={handleFilter}>Filtruj</button>
        <button onClick={clearFilter}>Wyczyść filtry</button>
      </div>

      <div className="table-container">
        <table className="styled-table">
          <thead>
            <tr>
              <th onClick={() => sortReports('roboty')}>Roboty</th>
              <th onClick={() => sortReports('urzadzenia')}>Urządzenia</th>
              <th onClick={() => sortReports('data')}>Data</th>
              <th onClick={() => sortReports('zmiana')}>Zmiana</th>
              <th onClick={() => sortReports('wiertacz')}>Wiertacz</th>
              <th onClick={() => sortReports('pomocnicy')}>Pomocnicy</th>
              <th onClick={() => sortReports('tresc_raportu')}>Treść</th>
              <th onClick={() => sortReports('glebokosc')}>Głębokość</th>
              <th>Akcje</th>
            </tr>
          </thead>
          <tbody>
            {filteredReports.map((report) => (
              <tr
                key={report.id_raportu}
                className={expandedRow === report.id_raportu ? 'expanded-row' : ''}
              >
                <td>{report.roboty}</td>
                <td>{report.urzadzenia}</td>
                <td>{report.data}</td>
                <td>{report.zmiana}</td>
                <td>{report.wiertacz}</td>
                <td>{report.pomocnicy}</td>
                <td onClick={() => toggleRow(report.id_raportu)}>
                  {expandedRow === report.id_raportu
                    ? report.tresc_raportu
                    : `${report.tresc_raportu.slice(0, 30)}...`}
                </td>
                <td>{report.glebokosc}</td>
                <td>
                  <button onClick={() => startEditing(report)}>Edytuj</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {editingReport && (
        <div className="edit-form">
          <h2>Edytuj Raport</h2>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              saveEditedReport();
            }}
          >
            <label>Roboty:</label>
            <select
              value={editingReport.roboty}
              onChange={(e) => setEditingReport({ ...editingReport, roboty: e.target.value })}
            >
              <option value="">Wybierz robot</option>
              {roboty.map((robot, index) => (
                <option key={index} value={robot}>
                  {robot}
                </option>
              ))}
            </select>

            <label>Urządzenia:</label>
            <select
              value={editingReport.urzadzenia}
              onChange={(e) => setEditingReport({ ...editingReport, urzadzenia: e.target.value })}
              >
              <option value="">Wybierz urządzenie</option>
              {urzadzenia.map((urzadzenie, index) => (
                <option key={index} value={urzadzenie}>
                  {urzadzenie}
                </option>
              ))}
            </select>

            <label>Data:</label>
            <input
              type="date"
              value={editingReport.data}
              onChange={(e) => setEditingReport({ ...editingReport, data: e.target.value })}
            />

            <label>Zmiana:</label>
            <select
              value={editingReport.zmiana}
              onChange={(e) => setEditingReport({ ...editingReport, zmiana: e.target.value })}
            >
              <option value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
            </select>

            <label>Wiertacz:</label>
            <textarea
              value={editingReport.wiertacz}
              onChange={(e) => setEditingReport({ ...editingReport, wiertacz: e.target.value })}
              placeholder="Podaj wiertacza"
            ></textarea>

            <label>Pomocnicy:</label>
            <textarea
              value={editingReport.pomocnicy}
              onChange={(e) => setEditingReport({ ...editingReport, pomocnicy: e.target.value })}
              placeholder="Podaj pomocników"
            ></textarea>

            <label>Treść:</label>
            <textarea
              id="superwazne"
              value={editingReport.tresc_raportu}
              onChange={(e) => setEditingReport({ ...editingReport, tresc_raportu: e.target.value })}
            ></textarea>

            <label>Głębokość:</label>
            <input
              type="number"
              step="0.01"
              value={editingReport.glebokosc}
              onChange={(e) => setEditingReport({ ...editingReport, glebokosc: parseFloat(e.target.value) })}
              placeholder="Podaj głębokość"
            />

            <button type="submit">Zapisz</button>
            <button type="button" onClick={() => setEditingReport(null)}>Anuluj</button>
          </form>
        </div>
      )}
    </div>
  );
}

export default SubSuperAdminPageReportManager;