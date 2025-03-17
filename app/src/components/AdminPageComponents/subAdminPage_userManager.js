import React, { useState } from 'react';

function UserManager() {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
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
      const response = await fetch('http://localhost/add_user.php', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const result = await response.json();
      if (response.ok && result.status === 'success') {
        setSuccessMessage('Użytkownik został pomyślnie dodany!');
        setFormData({
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
      setErrorMessage('Nie udało się połączyć z serwerem. Spróbuj ponownie później.');
    }
  };

  return (
    <div className="add-user-form">
      <h2>Dodawanie Użytkownika</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Imię:</label>
          <input type="text" name="firstName" value={formData.firstName} onChange={handleChange} required />
        </div>
        <div>
          <label>Nazwisko:</label>
          <input type="text" name="lastName" value={formData.lastName} onChange={handleChange} required />
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
