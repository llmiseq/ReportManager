import React, { useState, useEffect } from "react";
import './subSuperAdminPage_machineManager.css';

function SubSuperAdminPageMachineManager() {
  const [deviceName, setDeviceName] = useState("");
  const [machines, setMachines] = useState([]);
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  // Pobieranie listy urządzeń
  useEffect(() => {
    fetch("http://localhost/getMachines.php")
      .then((response) => response.json())
      .then((data) => {
        if (data.status === "success") {
          setMachines(data.machines);
        } else {
          setError(data.message || "Błąd podczas pobierania urządzeń.");
        }
      })
      .catch(() => setError("Nie udało się połączyć z serwerem."));
  }, []);

  // Dodawanie urządzeń
  const handleAdd = (e) => {
    e.preventDefault();

    if (!deviceName) {
      setError("Nazwa urządzenia nie może być pusta.");
      return;
    }

    setError("");
    const deviceData = { action: "add", name: deviceName };

    fetch("http://localhost/manageMachine.php", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(deviceData),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.status === "success") {
          setSuccessMessage("Urządzenie zostało pomyślnie dodane.");
          setDeviceName("");
          setMachines((prev) => [...prev, { id: data.id, nazwa: deviceName }]);
        } else {
          setError(data.message || "Błąd podczas dodawania urządzenia.");
        }
      })
      .catch(() => setError("Nie udało się połączyć z serwerem."));
  };

  // Usuwanie urządzeń
  const handleDelete = (id) => {
    setError("");
    setSuccessMessage("");

    const deviceData = { action: "delete", id };

    fetch("http://localhost/manageMachine.php", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(deviceData),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.status === "success") {
          setSuccessMessage("Urządzenie zostało pomyślnie usunięte.");
          setMachines((prev) => prev.filter((machine) => machine.id !== id));
        } else {
          setError(data.message || "Błąd podczas usuwania urządzenia.");
        }
      })
      .catch(() => setError("Nie udało się połączyć z serwerem."));
  };

  return (
    <div className="machine-manager-container">
      <h1>Zarządzanie Urządzeniami</h1>
      {error && <p className="error">{error}</p>}
      {successMessage && <p className="success">{successMessage}</p>}
      <form onSubmit={handleAdd}>
        <div>
          <label>Nazwa urządzenia:</label>
          <input
            type="text"
            value={deviceName}
            onChange={(e) => setDeviceName(e.target.value)}
            placeholder="Podaj nazwę urządzenia"
          />
        </div>
        <button type="submit">Dodaj</button>
      </form>

      <h2>Lista Urządzeń</h2>
      <ul className="machine-list">
        {machines.map((machine) => (
          <li key={machine.id}>
            {machine.nazwa}
            <button onClick={() => handleDelete(machine.id)}>Usuń</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default SubSuperAdminPageMachineManager;
