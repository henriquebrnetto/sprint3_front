import { Outlet, Navigate } from 'react-router-dom'
import { useAuth } from './useAuth'

function PublicRoutes() {
    const token = useAuth()
    return token ? <Navigate to='/' /> : <Outlet />
}

export default PublicRoutes

// modelo pego de https://dev.to/sundarbadagala081/protected-routes-in-react-47b1