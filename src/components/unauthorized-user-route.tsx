import { ReactElement, FC } from 'react';
import { Navigate } from 'react-router-dom';
import { getUser } from '../services/slices/auth/authSlice';
import { useSelector } from '../hooks/hooks';

export const UnauthorizedUserRouteElement: FC<{ element: ReactElement }> = ({ element }) => {
    const user = useSelector(getUser);

    return !user?.email ? element : <Navigate to="/" replace />;
}