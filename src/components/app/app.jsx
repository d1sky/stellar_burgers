import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import ForgotPassword from '../../pages/forgot-password/forgot-password';
import Home from '../../pages/home/home';
import Ingredient from '../../pages/ingredient/ingredient';
import Login from '../../pages/login/login';
import Profile from '../../pages/profile/profile';
import Register from '../../pages/register/register';
import ResetPassword from '../../pages/reset-password/reset-password';
import { fetchGetUserDataAsync } from '../../services/authSlice';
import { fetchIngredientListAsync } from '../../services/ingredientListSlice';
import AppHeader from '../app-header/app-header';
import Loader from '../loader/loader';
import { ProtectedRouteElement } from '../protected-route';
import { UnauthorizedUserRouteElement } from '../unauthorized-user-route';


const App = () => {
  const dispatch = useDispatch();
  const [isUserLoaded, setUserLoaded] = useState(false);

  useEffect(() => {
    dispatch(fetchIngredientListAsync())
    dispatch(fetchGetUserDataAsync()).then(() => {
      setUserLoaded(true);
    })
  }, [dispatch])

  return (
    <div className="App">
      <BrowserRouter>
        <AppHeader />
        {isUserLoaded ?
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<UnauthorizedUserRouteElement element={<Login />} />} />
            <Route path="/register" element={<UnauthorizedUserRouteElement element={<Register />} />} />
            <Route path="/forgot-password" element={<UnauthorizedUserRouteElement element={<ForgotPassword />} />} />
            <Route path="/reset-password" element={<UnauthorizedUserRouteElement element={<ResetPassword />} />} />
            <Route path="/profile" element={<ProtectedRouteElement element={<Profile />} />} />
            <Route path="/ingredients/:id" element={<Ingredient />} />
            {/* <Route path="*" element={<NotFound404 />} /> */}
          </Routes>
          :
          <Loader />
        }
      </BrowserRouter>
    </div>
  );
}

export default App;
