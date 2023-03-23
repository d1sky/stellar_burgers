import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Route, Routes, useLocation, useNavigate } from 'react-router-dom';
import ForgotPassword from '../../pages/forgot-password/forgot-password';
import Home from '../../pages/home/home';
import Ingredient from '../../pages/ingredient/ingredient';
import Login from '../../pages/login/login';
import Profile from '../../pages/profile/profile';
import Register from '../../pages/register/register';
import ResetPassword from '../../pages/reset-password/reset-password';
import { FORGOT_PASSWORD_ROUTE, INGREDIENT_ID_ROUTE, LOGIN_ROUTE, MAIN_ROUTE, PROFILE_ORDERS_ROUTE, PROFILE_ROUTE, REGISTER_ROUTE, RESET_PASSWORD_ROUTE } from '../../route';
import { remove } from '../../services/activeIngredientSlice';
import { fetchGetUserDataAsync, getLoadStatus } from '../../services/authSlice';
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
  const loadStatus = useSelector(getLoadStatus);
  const navigate = useNavigate();
  const dispatch = useDispatch();


  const handleCloseModal = () => {
    dispatch(remove())
    navigate('/')
  }

  useEffect(() => {
    dispatch(fetchGetUserDataAsync())
  }, [dispatch])


  return (
    <div className="App">
      <AppHeader />
      {loadStatus === 'idle' ?
        <>
          <Routes location={background || location}>
            <Route path={MAIN_ROUTE} element={<Home />} />
            <Route path={LOGIN_ROUTE} element={<UnauthorizedUserRouteElement element={<Login />} />} />
            <Route path={REGISTER_ROUTE} element={<UnauthorizedUserRouteElement element={<Register />} />} />
            <Route path={FORGOT_PASSWORD_ROUTE} element={<UnauthorizedUserRouteElement element={<ForgotPassword />} />} />
            <Route path={RESET_PASSWORD_ROUTE} element={<UnauthorizedUserRouteElement element={<ResetPassword />} />} />
            <Route path={MAIN_ROUTE} element={<ProtectedRouteElement element={<Profile />} />}>
              <Route path={PROFILE_ROUTE} element={<ProtectedRouteElement element={<ProfileForm />} />} />
              <Route path={PROFILE_ORDERS_ROUTE} element={<ProtectedRouteElement element={<Orders />} />} />
            </Route>
            <Route path={INGREDIENT_ID_ROUTE} element={<Ingredient />} />
            {/* {<Route path="*" element={<NotFound404 />} /> */}
          </Routes>
          {background && (
            <Routes>
              <Route path={INGREDIENT_ID_ROUTE} element={
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
