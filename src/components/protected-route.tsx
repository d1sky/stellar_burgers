import React, { FC, ReactElement } from 'react';

import { Navigate } from 'react-router-dom';
import { getUser } from '../services/slices/auth/authSlice';
import { useSelector } from '../hooks/hooks';

export const ProtectedRouteElement: FC<{ element: ReactElement }> = ({ element }) => {
    const user = useSelector(getUser);

    if (!user) {
        return null;
    }

    return user.email ? element : <Navigate to="/login" replace />;
}