import React, { useState, useEffect } from "react";
import './subSuperAdminPage_workManager.css';

function SubSuperAdminPageWorkManager() {
  const [nazwa, setNazwa] = useState("");
  const [inwestor, setInwestor] = useState("");
  const [dataKol, setDataKol] = useState("");
  const [dataZak, setDataZak] = useState("");
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [works, setWorks] = useState([]); // Lista robót

  // Pobieranie robót przy załadowaniu komponentu
  useEffect(() => {
    console.log("Komponent załadowany. Pobieranie danych...");
    fetchWorks();
  }, []);

  const fetchWorks = () => {
    console.log("Wysyłanie zapytania do endpointa getWorks.php...");
    fetch("http://localhost/getWorks.php", {
      method: "GET",
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error(`Błąd sieci: ${response.status}`);
        }
        return response.json();
      })
      .then((data) => {
        if (data.status === "success") {
          setWorks(data.works || []);
        } else {
          setError(data.message || "Nie udało się pobrać robót.");
        }
      })
      .catch((err) => {
        console.error("Błąd w fetchWorks:", err.message);
        setError("Nie udało się połączyć z serwerem. Szczegóły: " + err.message);
      });
  };

  const handleDelete = (id_roboty) => {
    if (!window.confirm("Czy na pewno chcesz usunąć tę robotę?")) return;

    console.log(`Wysyłanie żądania usunięcia roboty o ID: ${id_roboty}`);
    fetch("http://localhost/deleteWork.php", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id: id_roboty }),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error(`Błąd sieci: ${response.status}`);
        }
        return response.json();
      })
      .then((data) => {
        if (data.status === "success") {
          setSuccessMessage("Robota została usunięta pomyślnie.");
          fetchWorks(); // Odświeżenie listy robót
        } else {
          setError(data.message || "Nie udało się usunąć roboty.");
        }
      })
      .catch((err) => {
        console.error("Błąd w handleDelete:", err.message);
        setError("Nie udało się połączyć z serwerem. Szczegóły: " + err.message);
      });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!nazwa || !inwestor || !dataKol) {
      setError("Proszę wypełnić wszystkie wymagane pola.");
      return;
    }

    const workData = { nazwa, inwestor, data_kol: dataKol, data_zak: dataZak };

    fetch("http://localhost/addWork.php", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(workData),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error(`Błąd sieci: ${response.status}`);
        }
        return response.json();
      })
      .then((data) => {
        if (data.status === "success") {
          setSuccessMessage("Robota została dodana pomyślnie.");
          setNazwa("");
          setInwestor("");
          setDataKol("");
          setDataZak("");
          fetchWorks(); // Odświeżenie listy robót
        } else {
          setError(data.message || "Wystąpił błąd podczas dodawania roboty.");
        }
      })
      .catch((err) => {
        console.error("Błąd w handleSubmit:", err.message);
        setError("Nie udało się połączyć z serwerem. Szczegóły: " + err.message);
      });
  };

  return (
    <div className="work-manager-container">
      <h1>Zarządzanie Robotami</h1>
      {error && <p className="error">{error}</p>}
      {successMessage && <p className="success">{successMessage}</p>}

      <form onSubmit={handleSubmit}>
        <h2>Dodaj Robotę</h2>
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

      <h2>Lista Robót</h2>
      {works.length > 0 ? (
        <ul>
          {works.map((work) => (
            <li key={work.id_roboty}>
              <p>
                <strong>{work.nazwa}</strong> - {work.inwestor} (Kolaudacja: {work.data_kol}, Zakończenie: {work.data_zak})
              </p>
              <button onClick={() => handleDelete(work.id_roboty)}>Usuń</button>
            </li>
          ))}
        </ul>
      ) : (
        <p>Nie znaleziono robót.</p>
      )}
    </div>
  );
}

export default SubSuperAdminPageWorkManager;
