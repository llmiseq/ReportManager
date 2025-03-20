import React, { useState, useEffect } from 'react';
import './subSuperAdminPage_userManager.css';

function SubSuperAdminPageUserManager() {
    const [users, setUsers] = useState([]);
    const [formData, setFormData] = useState({
        name: '',
        surname: '',
        department: '',
        isAdmin: false,
        login: '',
        password: '',
    });
    const [errorMessage, setErrorMessage] = useState('');
    const [successMessage, setSuccessMessage] = useState('');

    // Pobranie listy użytkowników
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
            const result = await response.json();
            if (result.status === 'success') {
                setUsers(result.users);
            } else {
                setErrorMessage(result.message || 'Nie udało się pobrać listy użytkowników.');
            }
        } catch (error) {
            setErrorMessage('Błąd połączenia z serwerem. Spróbuj ponownie później.');
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
            const result = await response.json();
            if (result.status === 'success') {
                setSuccessMessage(result.message);
                fetchUsers(); // Odśwież listę użytkowników po usunięciu
            } else {
                setErrorMessage(result.message || 'Nie udało się usunąć użytkownika.');
            }
        } catch (error) {
            setErrorMessage('Błąd połączenia z serwerem. Spróbuj ponownie później.');
        }
    };

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
                fetchUsers(); // Odśwież listę użytkowników po dodaniu nowego
            } else {
                setErrorMessage(result.message || 'Nie udało się dodać użytkownika.');
            }
        } catch (error) {
            console.error('Błąd połączenia z serwerem:', error); // Logowanie błędu połączenia
            setErrorMessage('Nie udało się połączyć z serwerem. Spróbuj ponownie później.');
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
