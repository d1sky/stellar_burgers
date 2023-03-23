import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';
import { getUser } from '../services/authSlice';

export const ProtectedRouteElement = ({ element }) => {
    const user = useSelector(getUser);

    if (!user) {
        return null;
    }

    return user.email ? element : <Navigate to="/login" replace />;
}