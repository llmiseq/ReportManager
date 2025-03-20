import React, { useState } from "react";
import './subAdminPage_machineAdder.css';

function SubAdminPageMachineAdder() {
  const [deviceName, setDeviceName] = useState("");
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!deviceName) {
      setError("Nazwa urządzenia nie może być pusta.");
      return;
    }

    setError("");
    const deviceData = { name: deviceName };

    fetch("http://localhost/addMachine.php", { // Ścieżka do pliku PHP
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(deviceData),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.status === "success") {
          setSuccessMessage("Urządzenie zostało pomyślnie dodane.");
          setDeviceName("");
        } else {
          setError(data.message || "Wystąpił błąd podczas dodawania urządzenia.");
        }
      })
      .catch(() => setError("Nie udało się połączyć z serwerem."));
  };

  return (
    <div className="machine-adder-container">
      <h1>Dodaj Urządzenie</h1>
      {error && <p className="error">{error}</p>}
      {successMessage && <p className="success">{successMessage}</p>}
      <form onSubmit={handleSubmit}>
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
    </div>
  );
}

export default SubAdminPageMachineAdder;
