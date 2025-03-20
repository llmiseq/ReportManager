import React, { useState } from 'react';

function UserManager() {
  const [formData, setFormData] = useState({
    name: '', // Zmienione
    surname: '', // Zmienione
    department: '',
    isAdmin: false,
    login: '',
    password: '',
  });
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage('');
    setSuccessMessage('');

    try {
      console.log('Wysłane dane:', formData); // Logowanie wysyłanych danych

      const response = await fetch('http://localhost/add_user.php', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const result = await response.json();
      console.log('Otrzymana odpowiedź:', result); // Logowanie odpowiedzi z serwera

      if (response.ok && result.status === 'success') {
        setSuccessMessage('Użytkownik został pomyślnie dodany!');
        setFormData({
          name: '',
          surname: '',
          department: '',
          isAdmin: false,
          login: '',
          password: '',
        });
      } else {
        setErrorMessage(result.message || 'Nie udało się dodać użytkownika.');
      }
    } catch (error) {
      console.error('Błąd połączenia z serwerem:', error); // Logowanie błędu połączenia
      setErrorMessage('Nie udało się połączyć z serwerem. Spróbuj ponownie później.');
    }
  };

  return (
    <div className="add-user-form">
      <h2>Dodawanie Użytkownika</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Imię:</label>
          <input type="text" name="name" value={formData.name} onChange={handleChange} required />
        </div>
        <div>
          <label>Nazwisko:</label>
          <input type="text" name="surname" value={formData.surname} onChange={handleChange} required />
        </div>
        <div>
          <label>Oddział:</label>
          <input type="text" name="department" value={formData.department} onChange={handleChange} />
        </div>
        <div>
          <label>Login:</label>
          <input type="text" name="login" value={formData.login} onChange={handleChange} required />
        </div>
        <div>
          <label>Hasło:</label>
          <input type="password" name="password" value={formData.password} onChange={handleChange} required />
        </div>
        <button type="submit">Dodaj</button>
      </form>
      {errorMessage && <p className="error-message">{errorMessage}</p>}
      {successMessage && <p className="success-message">{successMessage}</p>}
    </div>
  );
}

export default UserManager;
