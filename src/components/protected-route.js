import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';
import { getUser } from '../services/authSlice';

export const ProtectedRouteElement = ({ element }) => {
    const user = useSelector(getUser);


    // let { getUser, ...auth } = useAuth();
    // const [isUserLoaded, setUserLoaded] = useState(false);

    // const init = async () => {
    //     await getUser()
    //     setUserLoaded(true)
    // };

    // useEffect(() => {
    //     init();
    // }, []);

    return user.email ? element : <Navigate to="/login" replace />;
}