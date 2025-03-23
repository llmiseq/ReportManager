import React, { useState, useEffect } from 'react';
import './subSuperAdminPage_userManager.css';

function SubSuperAdminPageUserManager() {
    const [users, setUsers] = useState([]);
    const [formData, setFormData] = useState({
        name: '',
        surname: '',
        department: '',
        role: 'user', // Domyślna wartość roli
        login: '',
        password: '',
    });
    const [errorMessage, setErrorMessage] = useState('');
    const [successMessage, setSuccessMessage] = useState('');

    // Pobieranie listy użytkowników
    useEffect(() => {
        fetchUsers();
    }, []);

    const fetchUsers = async () => {
        setErrorMessage('');
        setSuccessMessage('');
        try {
            const response = await fetch('http://localhost/get_users.php', {
                method: 'GET',
                credentials: 'include',
            });

            if (!response.ok) {
                throw new Error('Błąd połączenia z serwerem.');
            }

            const result = await response.json();
            if (result.status === 'success') {
                setUsers(result.users);
            } else {
                setErrorMessage(result.message || 'Nie udało się pobrać listy użytkowników.');
            }
        } catch (error) {
            setErrorMessage('Nie udało się połączyć z serwerem. Spróbuj ponownie później.');
        }
    };

    const handleDeleteUser = async (id) => {
        setErrorMessage('');
        setSuccessMessage('');
        try {
            const response = await fetch('http://localhost/get_users.php', {
                method: 'DELETE',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ id }),
            });

            if (!response.ok) {
                throw new Error('Błąd połączenia z serwerem.');
            }

            const result = await response.json();
            if (result.status === 'success') {
                setSuccessMessage(result.message);
                fetchUsers(); // Odświeżenie listy użytkowników
            } else {
                setErrorMessage(result.message || 'Nie udało się usunąć użytkownika.');
            }
        } catch (error) {
            setErrorMessage('Nie udało się połączyć z serwerem. Spróbuj ponownie później.');
        }
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

        try {
            console.log('Wysłane dane:', formData);

            const response = await fetch('http://localhost/add_user.php', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });

            const textResponse = await response.text(); // Odczytanie tekstowej odpowiedzi
            console.log('Surowa odpowiedź:', textResponse);

            // Sprawdzanie czy odpowiedź jest HTML
            const contentType = response.headers.get('Content-Type');
            if (contentType && contentType.includes('text/html')) {
                throw new Error('Serwer zwrócił HTML zamiast JSON.');
            }

            if (!response.ok) {
                throw new Error(textResponse || 'Nie udało się połączyć z serwerem.');
            }

            const jsonResponse = JSON.parse(textResponse);
            console.log('Otrzymany JSON:', jsonResponse);

            if (jsonResponse.status === 'success') {
                setSuccessMessage(jsonResponse.message || 'Użytkownik został pomyślnie dodany!');
                setFormData({
                    name: '',
                    surname: '',
                    department: '',
                    role: 'user', // Resetowanie wartości domyślnej
                    login: '',
                    password: '',
                });
                fetchUsers(); // Odśwież listę użytkowników
            } else {
                setErrorMessage(jsonResponse.message || 'Nie udało się dodać użytkownika.');
            }
        } catch (error) {
            console.error('Błąd połączenia z serwerem:', error);
            setErrorMessage(error.message || 'Nie udało się połączyć z serwerem.');
        }
    };

    return (
        <div className="user-manager">
            <h2>Zarządzanie Użytkownikami</h2>
            {errorMessage && <p className="error-message">{errorMessage}</p>}
            {successMessage && <p className="success-message">{successMessage}</p>}

            {/* Formularz dodawania użytkownika */}
            <div className="add-user-form">
                <h3>Dodaj Nowego Użytkownika</h3>
                <form onSubmit={handleSubmit}>
                    <div>
                        <label>Imię:</label>
                        <input
                            type="text"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div>
                        <label>Nazwisko:</label>
                        <input
                            type="text"
                            name="surname"
                            value={formData.surname}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div>
                        <label>Oddział:</label>
                        <input
                            type="text"
                            name="department"
                            value={formData.department}
                            onChange={handleChange}
                        />
                    </div>
                    <div>
                        <label>Rola:</label>
                        <select
                            name="role"
                            value={formData.role}
                            onChange={handleChange}
                            required
                        >
                            <option value="user">Użytkownik</option>
                            <option value="auditor">Auditor</option>
                            <option value="admin">Administrator</option>
                        </select>
                    </div>
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
                        <label>Hasło:</label>
                        <input
                            type="password"
                            name="password"
                            value={formData.password}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <button type="submit">Dodaj</button>
                </form>
            </div>

            {/* Tabela użytkowników */}
            <table className="styled-table">
                <thead>
                    <tr>
                        <th>Imię</th>
                        <th>Nazwisko</th>
                        <th>Oddział</th>
                        <th>Rola</th>
                        <th>Login</th>
                        <th>Akcje</th>
                    </tr>
                </thead>
                <tbody>
                    {users.map((user) => (
                        <tr key={user.id}>
                            <td>{user.name}</td>
                            <td>{user.surname}</td>
                            <td>{user.department}</td>
                            <td>{user.role}</td>
                            <td>{user.login}</td>
                            <td>
                                <button onClick={() => handleDeleteUser(user.id)}>Usuń</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default SubSuperAdminPageUserManager;
