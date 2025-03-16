import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const LoginForm = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);
    const [status, setStatus] = useState(null);
    const [administrator, setAdministrator] = useState(null);
    const navigate = useNavigate();

    const handleLogin = (e) => {
        e.preventDefault();
        setError(null);
        setStatus(null);
        setAdministrator(null);

        if (!username || !password) {
            setError('Proszę wypełnić formularz.');
            return;
        }

        setIsLoading(true);

        axios.post('http://localhost/api.php', { username: username.trim(), password: password.trim() })
            .then(response => {
                console.log('Odpowiedź z serwera:', response.data);
                setIsLoading(false);
                setStatus(response.data.status);
                setAdministrator(response.data.administrator);
                if (response.data.status === 'success') {
                    console.log('Logowanie zakończone sukcesem!');
                    if (response.data.administrator === 1) {
                        navigate('/admin');
                    } else {
                        navigate('/user');
                    }
                } else {
                    setError(response.data.message);
                }
            })
            .catch(error => {
                console.log('Błąd logowania:', error.response ? error.response.data : error.message);
                setIsLoading(false);
                setError(error.response ? error.response.data.message : 'Wystąpił błąd podczas logowania. Spróbuj ponownie.');
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
                <p type="button" className="reset-password" onClick={() => alert('Resetowanie hasła...')}>Resetuj hasło</p>
                <button type="submit" className="login-button">
                    {isLoading ? <span className="loader"></span> : 'Zaloguj'}
                </button>
            </form>
            {error && <div className="error-popup">{error}</div>}
        </div>
    );
};

export default LoginForm;
