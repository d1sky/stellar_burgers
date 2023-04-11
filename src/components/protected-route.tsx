import React, { FC, ReactElement } from 'react';
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';
import { getUser } from '../services/authSlice';

export const ProtectedRouteElement: FC<{ element: ReactElement }> = ({ element }) => {
    const user = useSelector(getUser);

    console.log('ProtectedRouteElement', user);


    if (!user) {
        return null;
    }

    return user.email ? element : <Navigate to="/login" replace />;
}