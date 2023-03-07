import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { Route, Routes, useLocation, useNavigate } from 'react-router-dom';
import ForgotPassword from '../../pages/forgot-password/forgot-password';
import Home from '../../pages/home/home';
import Ingredient from '../../pages/ingredient/ingredient';
import Login from '../../pages/login/login';
import Profile from '../../pages/profile/profile';
import Register from '../../pages/register/register';
import ResetPassword from '../../pages/reset-password/reset-password';
import { remove } from '../../services/activeIngredientSlice';
import { fetchGetUserDataAsync } from '../../services/authSlice';
import { fetchIngredientListAsync } from '../../services/ingredientListSlice';
import AppHeader from '../app-header/app-header';
import IngredientDetails from '../ingredient-details/ingredient-details';
import Loader from '../loader/loader';
import Modal from '../modal/modal';
import Orders from '../orders/orders';
import ProfileForm from '../profile-form/profile-form';
import { ProtectedRouteElement } from '../protected-route';
import { UnauthorizedUserRouteElement } from '../unauthorized-user-route';


const App = () => {
  const location = useLocation();
  const background = location.state && location.state.background;
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [isUserLoaded, setUserLoaded] = useState(false);


  const handleCloseModal = () => {
    dispatch(remove())
    navigate('/')
  }

  useEffect(() => {
    dispatch(fetchIngredientListAsync())
    dispatch(fetchGetUserDataAsync()).then(() => {
      setUserLoaded(true);
    })
  }, [dispatch])

  return (
    <div className="App">
      <AppHeader />
      {isUserLoaded ?
        <>
          <Routes location={background || location}>
            <Route path="/" element={<Home />} />
            <Route element={<UnauthorizedUserRouteElement element={<Login />} />} path="/login" />
            <Route path="/register" element={<UnauthorizedUserRouteElement element={<Register />} />} />
            <Route path="/forgot-password" element={<UnauthorizedUserRouteElement element={<ForgotPassword />} />} />
            <Route path="/reset-password" element={<UnauthorizedUserRouteElement element={<ResetPassword />} />} />
            <Route path="/" element={<ProtectedRouteElement element={<Profile />} />}>
              <Route path="profile" element={<ProtectedRouteElement element={<ProfileForm />} />} />
              <Route path="profile/orders" element={<ProtectedRouteElement element={<Orders />} />} />
            </Route>
            <Route path="/ingredients/:ingredientId" element={<Ingredient />} />
            {/* {<Route path="*" element={<NotFound404 />} /> */}
          </Routes>
          {background && (
            <Routes>
              <Route path="/ingredients/:ingredientId" element={
                <Modal handleClose={handleCloseModal}>
                  <IngredientDetails />
                </Modal>
              } />
            </Routes>
          )}
        </>
        :
        <Loader />
      }
    </div >
  );
}

export default App;
