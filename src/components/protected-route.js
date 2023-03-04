import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';
import { fetchGetUserDataAsync, getUser } from '../services/authSlice';

export const ProtectedRouteElement = ({ element }) => {
    const user = useSelector(getUser);
    const dispatch = useDispatch();
    const [isUserLoaded, setUserLoaded] = useState(false);

    useEffect(() => {
        dispatch(fetchGetUserDataAsync()).then(() => {
            setUserLoaded(true);
        })
    }, [dispatch]);

    if (!isUserLoaded) {
        return null;
    }

    return user.email ? element : <Navigate to="/login" replace />;
}