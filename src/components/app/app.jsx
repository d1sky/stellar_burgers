import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import ForgotPassword from '../../pages/forgot-password/forgot-password';
import Home from '../../pages/home/home';
import Ingredient from '../../pages/ingredient/ingredient';
import Login from '../../pages/login/login';
import Profile from '../../pages/profile/profile';
import Register from '../../pages/register/register';
import ResetPassword from '../../pages/reset-password/reset-password';
import { fetchIngredientListAsync } from '../../services/ingredientListSlice';
import AppHeader from '../app-header/app-header';


const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchIngredientListAsync())
  }, [dispatch])

  return (
    <div className="App">
      <AppHeader />
      <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home/>} />
        <Route path="/login" element={<Login/>} />
        <Route path="/register" element={<Register/>} />
        <Route path="/forgot-password" element={<ForgotPassword/>} />
        <Route path="/reset-password" element={<ResetPassword/>} />
        <Route path="/profile" element={<Profile/>} />
        <Route path="/ingredients/:id" element={<Ingredient/>} />
        {/* <Route path="*" element={<NotFound404 />} /> */}
      </Routes>
    </BrowserRouter>
    </div>
  );
}

export default App;
