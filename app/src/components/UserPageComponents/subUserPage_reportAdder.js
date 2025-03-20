import React, { useState, useEffect } from "react";
import './subUserPage_reportAdder.css';

function ReportAdder() {
  const [roboty, setRoboty] = useState([]);
  const [urzadzenia, setUrzadzenia] = useState([]);
  const [selectedRobot, setSelectedRobot] = useState("");
  const [selectedUrzadzenie, setSelectedUrzadzenie] = useState("");
  const [date, setDate] = useState("");
  const [zmiana, setZmiana] = useState("1");
  const [wiertacz, setWiertacz] = useState("");
  const [pomocnicy, setPomocnicy] = useState("");
  const [trescRaportu, setTrescRaportu] = useState("");
  const [glebokosc, setGlebokosc] = useState("");
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  useEffect(() => {
    fetch("http://localhost/getRoboty.php")
      .then((response) => response.json())
      .then((data) => {
        if (data.status === "success") {
          setRoboty(data.roboty);
        }
      })
      .catch((error) => console.error("Błąd pobierania robotów:", error));

    fetch("http://localhost/getUrzadzenia.php")
      .then((response) => response.json())
      .then((data) => {
        if (data.status === "success") {
          setUrzadzenia(data.urzadzenia);
        }
      })
      .catch((error) => console.error("Błąd pobierania urządzeń:", error));
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!selectedRobot || !selectedUrzadzenie || !date || !zmiana || !wiertacz || !pomocnicy || !trescRaportu || !glebokosc) {
      setError("Wszystkie pola muszą być wypełnione.");
      return;
    }
    setError("");

    const reportData = {
      roboty: selectedRobot,
      urzadzenie: selectedUrzadzenie,
      data: date,
      zmiana: zmiana,
      wiertacz: wiertacz,
      pomocnicy: pomocnicy,
      tresc: trescRaportu,
      glebokosc: parseFloat(glebokosc),
    };

    fetch("http://localhost/addReport.php", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(reportData),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.status === "success") {
          setSuccessMessage("Raport został pomyślnie dodany.");
          setSelectedRobot("");
          setSelectedUrzadzenie("");
          setDate("");
          setZmiana("1");
          setWiertacz("");
          setPomocnicy("");
          setTrescRaportu("");
          setGlebokosc("");
        } else {
          setError(data.message || "Wystąpił błąd podczas dodawania raportu.");
        }
      })
      .catch(() => setError("Nie udało się połączyć z serwerem."));
  };

  return (
    <div className="report-adder-container">
      <h1>Dodaj Raport</h1>
      {error && <p className="error">{error}</p>}
      {successMessage && <p className="success">{successMessage}</p>}
      <form onSubmit={handleSubmit}>
        <div>
          <label>Roboty:</label>
          <select value={selectedRobot} onChange={(e) => setSelectedRobot(e.target.value)}>
            <option value="">Wybierz robot</option>
            {roboty.map((robot, index) => (
              <option key={index} value={robot}>
                {robot}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label>Urządzenia:</label>
          <select value={selectedUrzadzenie} onChange={(e) => setSelectedUrzadzenie(e.target.value)}>
            <option value="">Wybierz urządzenie</option>
            {urzadzenia.map((urzadzenie, index) => (
              <option key={index} value={urzadzenie}>
                {urzadzenie}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label>Data zgłoszenia:</label>
          <input type="date" value={date} onChange={(e) => setDate(e.target.value)} />
        </div>

        <div>
          <label>Zmiana:</label>
          <select value={zmiana} onChange={(e) => setZmiana(e.target.value)}>
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
          </select>
        </div>

        <div>
          <label>Wiertacz:</label>
          <textarea value={wiertacz} onChange={(e) => setWiertacz(e.target.value)} placeholder="Podaj wiertacza"></textarea>
        </div>

        <div>
          <label>Pomocnicy:</label>
          <textarea value={pomocnicy} onChange={(e) => setPomocnicy(e.target.value)} placeholder="Podaj pomocników"></textarea>
        </div>

        <div>
          <label>Treść raportu:</label>
          <textarea value={trescRaportu} onChange={(e) => setTrescRaportu(e.target.value)} placeholder="Wpisz treść raportu"></textarea>
        </div>

        <div>
          <label>Głębokość:</label>
          <input type="number" step="0.01" value={glebokosc} onChange={(e) => setGlebokosc(e.target.value)} placeholder="Podaj głębokość" />
        </div>

        <button type="submit">Dodaj raport</button>
      </form>
    </div>
  );
}

export default ReportAdder;
