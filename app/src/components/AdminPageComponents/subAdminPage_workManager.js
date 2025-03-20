import React, { useState } from "react";
import './subAdminPage_workManager.css';

function SubAdminPageWorkManager() {
  const [nazwa, setNazwa] = useState("");
  const [inwestor, setInwestor] = useState("");
  const [dataKol, setDataKol] = useState("");
  const [dataZak, setDataZak] = useState("");
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!nazwa || !inwestor || !dataKol) {
      setError("Proszę wypełnić wszystkie wymagane pola.");
      return;
    }

    setError("");
    const workData = { nazwa, inwestor, data_kol: dataKol, data_zak: dataZak };

    fetch("http://localhost/addWork.php", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(workData),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.status === "success") {
          setSuccessMessage("Robota została dodana pomyślnie.");
          setNazwa("");
          setInwestor("");
          setDataKol("");
          setDataZak("");
        } else {
          setError(data.message || "Wystąpił błąd podczas dodawania roboty.");
        }
      })
      .catch(() => setError("Nie udało się połączyć z serwerem."));
  };

  return (
    <div className="work-manager-container">
      <h1>Dodaj robotę</h1>
      {error && <p className="error">{error}</p>}
      {successMessage && <p className="success">{successMessage}</p>}
      <form onSubmit={handleSubmit}>
        <div>
          <label>Nazwa roboty:</label>
          <input
            type="text"
            value={nazwa}
            onChange={(e) => setNazwa(e.target.value)}
            placeholder="Podaj nazwę robota"
          />
        </div>

        <div>
          <label>Inwestor:</label>
          <input
            type="text"
            value={inwestor}
            onChange={(e) => setInwestor(e.target.value)}
            placeholder="Podaj nazwę inwestora"
          />
        </div>

        <div>
          <label>Data kolaudacji:</label>
          <input
            type="date"
            value={dataKol}
            onChange={(e) => setDataKol(e.target.value)}
          />
        </div>

        <div>
          <label>Data zakończenia:</label>
          <input
            type="date"
            value={dataZak}
            onChange={(e) => setDataZak(e.target.value)}
          />
        </div>

        <button type="submit">Dodaj</button>
      </form>
    </div>
  );
}

export default SubAdminPageWorkManager;
