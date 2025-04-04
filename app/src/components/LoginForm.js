import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './LoginForm.css';

const LoginForm = ({ toggleDalbisLogo }) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);
    const [loginMode, setLoginMode] = useState('dalbis'); // Domyślny tryb Dalbis
    const navigate = useNavigate();

    const handleLoginModeChange = (e) => {
        const selectedMode = e.target.value;
        setLoginMode(selectedMode);
        toggleDalbisLogo(selectedMode === 'dalbis'); // Ukrywanie logo Dalbis dla ZOK
        console.log('Zmieniono tryb logowania na:', selectedMode);
    };

    const handleLogin = async (e) => {
        e.preventDefault();
        setError(null); // Resetowanie błędów
        setIsLoading(true);
        console.log('Próba logowania dla użytkownika:', username);

        try {
            const endpoint = loginMode === 'zok' 
                ? 'http://95.216.37.44:40003/ReportManager/php_files/zok-login.php'
                : 'http://95.216.37.44:40003/ReportManager/php_files/api.php';

            console.log('Wysyłanie żądania do endpointu:', endpoint);

            const response = await fetch(endpoint, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ username: username.trim(), password: password.trim() }),
            });

            const data = await response.json();
            setIsLoading(false);
            console.log('Otrzymana odpowiedź z serwera:', data);

            if (data.status === 'success') {
                console.log('Logowanie powiodło się. Klucz sesji:', data.sessionId);
                localStorage.setItem('sessionId', data.sessionId);
                localStorage.setItem('userRole', loginMode === 'zok' ? 'user' : data.role); // Zawsze ustawiamy 'user' dla ZOK

                // Przekierowanie w zależności od trybu logowania
                if (loginMode === 'zok') {
                    console.log('Tryb ZOK: Tymczasowe przeniesienie na /user (Dalbis UserPage)');
                    navigate('/user'); // Tymczasowe przekierowanie na UserPage dla ZOK
                } else {
                    // Obsługa logowania Dalbis
                    const rolePathMap = {
                        superAdministrator: '/sadmin',
                        administrator: '/admin',
                        auditor: '/referent',
                        user: '/user',
                    };
                    const redirectPath = rolePathMap[data.role] || '/user'; // Domyślne przekierowanie na /user
                    console.log(`Przekierowanie na ścieżkę: ${redirectPath}`);
                    navigate(redirectPath);
                }
            } else {
                console.error('Błąd logowania:', data.message);
                setError(data.message || 'Błąd logowania. Spróbuj ponownie.');
            }
        } catch (error) {
            setIsLoading(false);
            console.error('Błąd połączenia z serwerem:', error);
            setError('Nie udało się połączyć z serwerem. Spróbuj ponownie później.');
        }
    };

    return (
        <div className="login-container">
            <h1>{loginMode === 'dalbis' ? 'Raporty wierceń - Logowanie Dalbis' : 'Logowanie ZOK'}</h1>

            <div className="login-mode-select">
                <label htmlFor="loginMode">Wybierz sposób logowania:</label>
                <select
                    id="loginMode"
                    value={loginMode}
                    onChange={handleLoginModeChange}
                >
                    <option value="dalbis">Logowanie jako Dalbis</option>
                    <option value="zok">Logowanie jako ZOK</option>
                </select>
            </div>

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
                <button type="submit" className="login-button">
                    {isLoading ? <span className="loader"></span> : 'Zaloguj'}
                </button>
            </form>

            {error && <div className="error-popup">{error}</div>}
        </div>
    );
};

export default LoginForm;
