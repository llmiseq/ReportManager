import React, { useState, useEffect } from "react";
import "./subUserPage_myReport.css";

function ReportsViewer() {
  const [reports, setReports] = useState([]);
  const [filteredReports, setFilteredReports] = useState([]); // Przechowywanie przefiltrowanych wyników
  const [expandedRow, setExpandedRow] = useState(null);
  const [filterColumn, setFilterColumn] = useState("roboty"); // Domyślna kolumna do filtrowania
  const [filterText, setFilterText] = useState(""); // Tekst do filtrowania
  const [error, setError] = useState("");
  const [sortConfig, setSortConfig] = useState({ key: null, direction: "ascending" });

  useEffect(() => {
    fetch("http://localhost/getReports.php", {
      method: "GET",
      credentials: "include",
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.status === "success") {
          setReports(data.reports);
          setFilteredReports(data.reports); // Na start wszystkie dane są widoczne
        } else {
          setError(data.message || "Wystąpił błąd podczas pobierania raportów.");
        }
      })
      .catch((error) => {
        console.error("Błąd połączenia z serwerem:", error);
        setError("Nie udało się połączyć z serwerem.");
      });
  }, []);

  const handleFilter = () => {
    const filtered = reports.filter((report) =>
      String(report[filterColumn]).toLowerCase().includes(filterText.toLowerCase())
    );
    setFilteredReports(filtered); // Aktualizowanie przefiltrowanych wyników
  };

  const clearFilter = () => {
    setFilterText(""); // Czyści tekst filtra
    setFilteredReports(reports); // Przywraca wszystkie dane
  };

  const toggleRow = (id_raportu) => {
    const clickedReport = reports.find((report) => report.id_raportu === id_raportu);
    console.log("Kliknięty wiersz:", clickedReport);
    setExpandedRow(expandedRow === id_raportu ? null : id_raportu);
  };

  const sortReports = (key) => {
    let direction = "ascending";
    if (sortConfig.key === key && sortConfig.direction === "ascending") {
      direction = "descending";
    }

    const sortedReports = [...filteredReports].sort((a, b) => {
      let valueA = a[key];
      let valueB = b[key];

      if (key === "glebokosc") {
        valueA = parseFloat(valueA);
        valueB = parseFloat(valueB);
      }

      if (valueA < valueB) {
        return direction === "ascending" ? -1 : 1;
      }
      if (valueA > valueB) {
        return direction === "ascending" ? 1 : -1;
      }
      return 0;
    });

    setFilteredReports(sortedReports);
    setSortConfig({ key, direction });
  };

  return (
    <div className="reports-viewer-container">
      <h1>Lista Raportów</h1>
      {error && <p className="error">{error}</p>}

      {/* Sekcja filtrowania */}
      <div className="filter-container">
        <select
          value={filterColumn}
          onChange={(e) => setFilterColumn(e.target.value)} // Zmiana kolumny do filtrowania
        >
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
          onChange={(e) => setFilterText(e.target.value)} // Zmiana tekstu do filtrowania
        />
        <button onClick={handleFilter}>Filtruj</button>
        <button onClick={clearFilter}>Wyczyść filtry</button> {/* Przycisk czyszczenia */}
      </div>

      <div className="table-container">
        <table className="styled-table">
          <thead>
            <tr>
              <th onClick={() => sortReports("roboty")}>Roboty</th>
              <th onClick={() => sortReports("urzadzenia")}>Urządzenia</th>
              <th onClick={() => sortReports("data")}>Data</th>
              <th onClick={() => sortReports("zmiana")}>Zmiana</th>
              <th onClick={() => sortReports("wiertacz")}>Wiertacz</th>
              <th onClick={() => sortReports("pomocnicy")}>Pomocnicy</th>
              <th>Treść</th>
              <th onClick={() => sortReports("glebokosc")}>Głębokość</th>
            </tr>
          </thead>
          <tbody>
            {filteredReports.map((report) => (
              <React.Fragment key={report.id_raportu}>
                <tr
                  className={`main-row ${
                    expandedRow === report.id_raportu ? "expanded" : ""
                  }`}
                  onClick={() => toggleRow(report.id_raportu)}
                >
                  <td>{report.roboty}</td>
                  <td>{report.urzadzenia}</td>
                  <td>{report.data}</td>
                  <td>{report.zmiana}</td>
                  <td className="overflow-cell">
                    {expandedRow === report.id_raportu
                      ? report.wiertacz
                      : `${report.wiertacz.slice(0, 15)}...`}
                  </td>
                  <td className="overflow-cell">
                    {expandedRow === report.id_raportu
                      ? report.pomocnicy
                      : `${report.pomocnicy.slice(0, 15)}...`}
                  </td>
                  <td className="overflow-cell">
                    {expandedRow === report.id_raportu
                      ? report.tresc_raportu
                      : `${report.tresc_raportu.slice(0, 30)}...`}
                  </td>
                  <td>{report.glebokosc}</td>
                </tr>
              </React.Fragment>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default ReportsViewer;
