import React, { useState, useEffect } from 'react';
import './subUserPage_dashboard.css';

function Dashboard() {
  const [data, setData] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch('http://localhost/fetchData.php')
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
      })
      .then((data) => setData(data))
      .catch((error) => {
        console.error('Błąd przy pobieraniu danych:', error);
        setError('Nie udało się załadować danych. Sprawdź backend.');
      });
  }, []);

  return (
    <div className='test'>
      <h2>Panel Główny</h2>
      {error ? (
        <p className="error">{error}</p>
      ) : (
        data.map((robot, index) => (
          <div key={index} className="robot-container">
            <h3>{robot.nazwa} | {robot.inwestor}, {robot.data_kol}</h3>
            <div className="test2">
              <h4>Ostatnie raporty:</h4>
              {robot.raporty.length > 0 ? (
                <table>
                  <thead>
                    <tr>
                      <th>Data</th>
                      <th>Zmiana</th>
                      <th>Wiertacz</th>
                      <th>Treść raportu</th>
                      <th>Głębokość</th>
                    </tr>
                  </thead>
                  <tbody>
                    {robot.raporty.map((raport, idx) => (
                      <tr key={idx}>
                        <td>{raport.data}</td>
                        <td>{raport.zmiana}</td>
                        <td>{raport.wiertacz}</td>
                        <td>{raport.tresc_raportu}</td>
                        <td>{raport.glebokosc}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              ) : (
                <p>Brak raportów dla tej roboty.</p>
              )}
            </div>
          </div>
        ))
      )}
    </div>
  );
}

export default Dashboard;
