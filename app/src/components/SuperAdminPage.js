import React, { useState } from 'react';

function SuperAdminPage() {

    const [selectedOption, setSelectedOption] = useState('');
      const [showLogoutConfirmation, setShowLogoutConfirmation] = useState(false);
      const [showChangePasswordForm, setShowChangePasswordForm] = useState(false);
      const [formData, setFormData] = useState({
        login: '',
        oldPassword: '',
        newPassword: '',
        confirmNewPassword: '',
      });
      const [errorMessage, setErrorMessage] = useState('');
      const [successMessage, setSuccessMessage] = useState('');
    
      const handleOptionClick = (option) => {
        setSelectedOption(option);
        setShowLogoutConfirmation(option === 'Wyloguj');
        setShowChangePasswordForm(option === 'Zarządzanie kontem');
        setErrorMessage('');
        setSuccessMessage('');
      };
    
      const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
          ...formData,
          [name]: value,
        });
      };

      const handleSubmit = async (e) => {
        e.preventDefault();
        setErrorMessage('');
        setSuccessMessage('');
    
        if (formData.newPassword !== formData.confirmNewPassword) {
          setErrorMessage('Nowe hasła nie są zgodne!');
          return;
        }
    
        try {
          const response = await fetch('http://localhost/change_password.php', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              username: formData.login,
              oldPassword: formData.oldPassword,
              newPassword: formData.newPassword,
            }),
          });
    
          const result = await response.json();
          console.log('Logi serwera:', result.log);
          if (response.ok && result.status === 'success') {
            setSuccessMessage('Hasło zostało pomyślnie zmienione!');
            setFormData({
              login: '',
              oldPassword: '',
              newPassword: '',
              confirmNewPassword: '',
            });
          } else {
            setErrorMessage(result.message || 'Wystąpił błąd podczas zmiany hasła.');
          }
        } catch (error) {
          console.error('Błąd połączenia z serwerem:', error);
          setErrorMessage('Nie udało się połączyć z serwerem. Spróbuj ponownie później.');
        }
      };

    return (
        <div className="page-container light">
          <nav className="menu-sidebar">
            <ul className="menu-list">
              <li onClick={() => handleOptionClick('Informacje o użytkowniku')}>Informacje o użytkowniku</li>
              <li onClick={() => handleOptionClick('Zarządzanie uzytkownikami')}>Zarządzanie użytkownikami</li>
              <li onClick={() => handleOptionClick('Zarządzanie robotami')}>Zarządzanie robotami</li>
              <li onClick={() => handleOptionClick('Zarządzanie urządzeń')}>Zarządzanie urządzeń</li>
              <li onClick={() => handleOptionClick('Zarządzanie raportami')}>Zarządzanie raportami</li>
              <li onClick={() => handleOptionClick('Zarządzanie kontem')}>Zarządzanie kontem</li>
              <li className="logout" onClick={() => handleOptionClick('Wyloguj')}>Wyloguj</li>
            </ul>
          </nav>
    
          <div className="content-display">
            {showLogoutConfirmation ? (
              <div className="logout-confirmation">
                <p>Czy na pewno chcesz się wylogować?</p>
                <button onClick={() => window.location.href = '/'} className="logout-yes">Tak</button>
                <button onClick={() => setShowLogoutConfirmation(false)} className="logout-no">Nie</button>
              </div>
            ) : showChangePasswordForm ? (
              <div className="change-password-form">
                <h2>Zmień hasło</h2>
                <form onSubmit={handleSubmit}>
                  <div>
                    <label>Login:</label>
                    <input
                      type="text"
                      name="login"
                      value={formData.login}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <div>
                    <label>Stare hasło:</label>
                    <input
                      type="password"
                      name="oldPassword"
                      value={formData.oldPassword}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <div>
                    <label>Nowe hasło:</label>
                    <input
                      type="password"
                      name="newPassword"
                      value={formData.newPassword}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <div>
                    <label>Powtórz nowe hasło:</label>
                    <input
                      type="password"
                      name="confirmNewPassword"
                      onChange={handleChange}
                      value={formData.confirmNewPassword}
                      required
                    />
                  </div>
                  <button type="submit">Zmień hasło</button>
                </form>
                {errorMessage && <p className="error-message">{errorMessage}</p>}
                {successMessage && <p className="success-message">{successMessage}</p>}
              </div>
            ) : (
              <p>{selectedOption ? `Wybrana opcja: ${selectedOption}` : 'Wybierz zakładkę z menu.'}</p>
            )}
          </div>
        </div>
      );
}

export default SuperAdminPage;