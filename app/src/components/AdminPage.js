import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import LoadingScreen from './LoadingScreen';
import './AdminPage.css';

function AdminPage() {
  const [isLoading, setIsLoading] = useState(true);
  const [selectedOption, setSelectedOption] = useState('');
  const [showLogoutConfirmation, setShowLogoutConfirmation] = useState(false);
  const [showChangePasswordForm, setShowChangePasswordForm] = useState(false);
  const [showAddUserForm, setShowAddUserForm] = useState(false);
  const [formData, setFormData] = useState({
    login: '',
    oldPassword: '',
    newPassword: '',
    confirmNewPassword: '',
  });
  const [addUserData, setAddUserData] = useState({
    firstName: '',
    lastName: '',
    department: '',
    isAdmin: false,
    login: '',
    password: '',
  });
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  const handleOptionClick = (option) => {
    setSelectedOption(option);
    setShowLogoutConfirmation(option === 'Wyloguj');
    setShowChangePasswordForm(option === 'Zarządzanie kontem');
    setShowAddUserForm(option === 'Dodawanie Użytkowników');
    setErrorMessage('');
    setSuccessMessage('');
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    const isAddUserForm = showAddUserForm;
    if (isAddUserForm) {
      setAddUserData({
        ...addUserData,
        [name]: type === 'checkbox' ? checked : value,
      });
    } else {
      setFormData({
        ...formData,
        [name]: value,
      });
    }
  };

  const handleSubmitChangePassword = async (e) => {
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

  const handleAddUser = async (e) => {
    e.preventDefault();
    setErrorMessage('');
    setSuccessMessage('');

    try {
      const response = await fetch('http://localhost/add_user.php', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: addUserData.firstName,
          surname: addUserData.lastName,
          department: addUserData.department,
          administrator: addUserData.isAdmin ? 1 : 0,
          login: addUserData.login,
          password: addUserData.password,
        }),
      });

      const result = await response.json();
      console.log('Odpowiedź serwera:', result);
      if (response.ok && result.status === 'success') {
        setSuccessMessage('Użytkownik został pomyślnie dodany!');
        setAddUserData({
          firstName: '',
          lastName: '',
          department: '',
          isAdmin: false,
          login: '',
          password: '',
        });
      } else {
        setErrorMessage(result.message || 'Nie udało się dodać użytkownika.');
      }
    } catch (error) {
      console.error('Błąd połączenia z serwerem:', error);
      setErrorMessage('Nie udało się połączyć z serwerem. Spróbuj ponownie później.');
    }
  };

  if (isLoading) {
    return <LoadingScreen />;
  }

  return (
    <div className="page-container light">
      <nav className="menu-sidebar">
        <ul className="menu-list">
          <li onClick={() => handleOptionClick('Dodawanie Użytkowników')}>Dodawanie Użytkowników</li>
          <li onClick={() => handleOptionClick('Zarządzanie Użytkownikami')}>Zarządzanie Użytkownikami</li>
          <li onClick={() => handleOptionClick('Manager raportów')}>Manager raportów</li>
          <li onClick={() => handleOptionClick('Historia raportów')}>Historia raportów</li>
          <li onClick={() => handleOptionClick('Kreator raportu')}>Kreator raportu</li>
          <li onClick={() => handleOptionClick('Poczta')}>Poczta</li>
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
            <form onSubmit={handleSubmitChangePassword}>
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
        ) : showAddUserForm ? (
          <div className="add-user-form">
            <h2>Dodawanie Użytkownika</h2>
            <form onSubmit={handleAddUser}>
              <div>
                <label>Imię:</label>
                <input
                  type="text"
                  name="firstName"
                  value={addUserData.firstName}
                  onChange={handleChange}
                  required
                />
              </div>
              <div>
                <label>Nazwisko:</label>
                <input
                  type="text"
                  name="lastName"
                  value={addUserData.lastName}
                  onChange={handleChange}
                  required
                />
              </div>
              <div>
                <label>Oddział:</label>
                <input
                  type="text"
                  name="department"
                  value={addUserData.department}
                  onChange={handleChange}
                />
              </div>
              <div>
                <label>Administrator:</label>
                <input
                  type="checkbox"
                  name="isAdmin"
                  checked={addUserData.isAdmin}
                  onChange={handleChange}
                />
              </div>
              <div>
                <label>Login:</label>
                <input
                  type="text"
                  name="login"
                  value={addUserData.login}
                  onChange={handleChange}
                  required
                />
              </div>
              <div>
                <label>Hasło:</label>
                <input
                  type="password"
                  name="password"
                  value={addUserData.password}
                  onChange={handleChange}
                  required
                />
              </div>
              <button type="submit">Dodaj</button>
            </form>
            {errorMessage && <p className="error-message">{errorMessage}</p>}
            {successMessage && <p className="success-message">{successMessage}</p>}
          </div>
        ) : (
          <p>{selectedOption ? `Wybrana zakładka: ${selectedOption}` : 'Wybierz zakładkę z menu.'}</p>
        )}
      </div>
    </div>
  );
}

export default AdminPage;

