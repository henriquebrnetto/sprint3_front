import { Outlet, Navigate } from 'react-router-dom'
import { useAuth } from './useAuth'
import React from 'react';

function PrivateRoutes() {
    // console.log('a')
    const token = useAuth()
    return token ? <Outlet /> : <Navigate to='/login' />
}

export default PrivateRoutes

// modelo pego de https://dev.to/sundarbadagala081/protected-routes-in-react-47b1