import { useEffect, useState } from 'react';
import React from 'react';
import { Navigate } from 'react-router-dom';

export function HomeRedirect() {
    const [redirect, setRedirect] = useState(false);

    useEffect(() => {
        localStorage.setItem('token', '');
        setTimeout(() => setRedirect(true), 500);
    }, []);

    if (redirect) {
        return <Navigate to="/login" />;
    }

    return <p>Logging out...</p>;
}
