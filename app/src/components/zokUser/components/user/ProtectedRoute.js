import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const ProtectedRoute = ({ children, requiredRole }) => {
    const navigate = useNavigate();

    useEffect(() => {
        const sessionId = localStorage.getItem('sessionId');
        if (!sessionId) {
            navigate('/loading');
            return;
        }

        // Weryfikacja uprawnień na backendzie
        fetch(`http://localhost/zok-protected-route.php?sessionId=${sessionId}`, {
            method: 'GET',
            credentials: 'include',
        })
            .then((response) => response.json())
            .then((data) => {
                if (data.status !== 'success' || data.role !== requiredRole) {
                    navigate('/loading'); // Przekierowanie w razie braku uprawnień
                }
            })
            .catch(() => {
                navigate('/loading'); // Przekierowanie w razie błędu
            });
    }, [navigate, requiredRole]);

    return children;
};

export default ProtectedRoute;
