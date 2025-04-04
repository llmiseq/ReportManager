import React, { useState } from 'react';
import './ZokZarzadzajUzytkownikami.css';

function ZarzadzajUzytkownikiem() {
  const [formData, setFormData] = useState({
    login: '',
    oldPassword: '',
    newPassword: '',
    confirmNewPassword: '',
  });
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  // Funkcja walidacji hasła
  const validatePassword = (password) => {
    const hasUpperCase = /[A-Z]/.test(password); // Sprawdza wielkie litery
    const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password); // Sprawdza znaki specjalne
    const hasThreeDigits = /\d.*\d.*\d/.test(password); // Sprawdza, czy są minimum 3 cyfry

    if (!hasUpperCase) return 'Hasło musi zawierać co najmniej jedną wielką literę.';
    if (!hasSpecialChar) return 'Hasło musi zawierać co najmniej jeden znak specjalny.';
    if (!hasThreeDigits) return 'Hasło musi zawierać co najmniej trzy cyfry.';
    return ''; // Brak błędu
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

    // Sprawdza zgodność haseł
    if (formData.newPassword !== formData.confirmNewPassword) {
      setErrorMessage('Nowe hasła nie są zgodne!');
      return;
    }

    // Walidacja hasła
    const passwordError = validatePassword(formData.newPassword);
    if (passwordError) {
      setErrorMessage(passwordError);
      return;
    }

    try {
      const response = await fetch('http://localhost/change_zok_password.php', {
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
            value={formData.confirmNewPassword}
            onChange={handleChange}
            required
          />
        </div>
        <button type="submit">Zmień hasło</button>
      </form>
      {errorMessage && <p className="error-message">{errorMessage}</p>}
      {successMessage && <p className="success-message">{successMessage}</p>}
    </div>
  );
}

export default ZarzadzajUzytkownikiem;
