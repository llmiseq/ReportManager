import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const LoginForm = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    const handleLogin = (e) => {
        e.preventDefault();
        setError(null); // Resetowanie błędów
        setIsLoading(true);
    
        // Wysyłanie danych logowania do backendu
        axios.post('http://localhost/api.php', { username: username.trim(), password: password.trim() })
            .then(response => {
                console.log('Odpowiedź z serwera:', response.data);
                setIsLoading(false);
    
                if (response.data.status === 'success') {
                    console.log('Logowanie zakończone sukcesem! Zapisuję sessionId:', response.data.sessionId);
    
                    // Zapisz sessionId i rolę w localStorage
                    localStorage.setItem('sessionId', response.data.sessionId);
                    localStorage.setItem('userRole', response.data.role);
    
                    // Przekierowanie na podstawie roli użytkownika
                    const role = response.data.role;
                    if (role === 'superAdministrator') {
                        navigate('/sadmin');
                    } else if (role === 'administrator') {
                        navigate('/admin');
                    } else if (role === 'auditor') {
                        navigate('/referent');
                    } else {
                        navigate('/user');
                    }
                } else {
                    // Obsługa błędów logowania
                    console.error('Błąd podczas logowania:', response.data.message);
                    setError(response.data.message || 'Błąd logowania. Spróbuj ponownie.');
                }
            })
            .catch(error => {
                console.error('Błąd logowania:', error.response ? error.response.data : error.message);
                setIsLoading(false);
                setError('Nie udało się połączyć z serwerem. Spróbuj ponownie później.');
            });
    };
    

    return (
        <div className="login-container">
            <h1>Zaloguj się na swoje konto</h1>
            <form onSubmit={handleLogin} className="login-form">
                <div className="input-group">
                    <label htmlFor="username">Nazwa użytkownika:</label>
                    <input
                        type="text"
                        id="username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        required
                    />
                </div>
                <div className="input-group">
                    <label htmlFor="password">Hasło:</label>
                    <input
                        type="password"
                        id="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </div>
                <p type="button" className="reset-password" onClick={() => alert('Resetowanie hasła...')}>
                    Resetuj hasło
                </p>
                <button type="submit" className="login-button">
                    {isLoading ? <span className="loader"></span> : 'Zaloguj'}
                </button>
            </form>
            {error && <div className="error-popup">{error}</div>}
        </div>
    );
};

export default LoginForm;
