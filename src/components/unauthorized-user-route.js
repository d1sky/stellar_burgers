import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';
import { getUser } from '../services/authSlice';

export const UnauthorizedUserRouteElement = ({ element }) => {
    const user = useSelector(getUser);

    return !user?.email ? element : <Navigate to="/" replace />;
}