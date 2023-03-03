import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
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
import { ProtectedRouteElement } from '../protected-route';


const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchIngredientListAsync())
    dispatch(fetchGetUserDataAsync())
  }, [dispatch])

  return (
    <div className="App">
      <BrowserRouter>
        <AppHeader />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/reset-password" element={<ResetPassword />} />
          <Route path="/profile" element={<ProtectedRouteElement element={<Profile />} />} />
          <Route path="/ingredients/:id" element={<Ingredient />} />
          {/* <Route path="*" element={<NotFound404 />} /> */}
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
