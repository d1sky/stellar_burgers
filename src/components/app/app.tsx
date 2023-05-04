import { FC, useEffect } from 'react';
import { Route, Routes, useLocation, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from '../../hooks/hooks';
import Feed from '../../pages/feed/feed';
import ForgotPassword from '../../pages/forgot-password/forgot-password';
import Home from '../../pages/home/home';
import Ingredient from '../../pages/ingredient/ingredient';
import Login from '../../pages/login/login';
import Profile from '../../pages/profile/profile';
import Register from '../../pages/register/register';
import ResetPassword from '../../pages/reset-password/reset-password';
import { FEED_ID_ROUTE, FEED_ROUTE, FORGOT_PASSWORD_ROUTE, INGREDIENT_ID_ROUTE, LOGIN_ROUTE, MAIN_ROUTE, PROFILE_ORDERS_ROUTE, PROFILE_ORDER_ID_ROUTE, PROFILE_ROUTE, REGISTER_ROUTE, RESET_PASSWORD_ROUTE } from '../../route';
import { clearActiveIngredient } from '../../services/slices/active-ingredient/activeIngredientSlice';
import { fetchGetUserDataAsync, getLoadStatus } from '../../services/slices/auth/authSlice';
import { fetchIngredientListAsync } from '../../services/slices/ingredient-list/ingredientListSlice';
import AppHeader from '../app-header/app-header';
import IngredientDetails from '../ingredient-details/ingredient-details';
import Loader from '../loader/loader';
import Modal from '../modal/modal';
import OrderHistory from '../order-history/order-history';
import OrderInfo from '../order-info/order-info';
import ProfileForm from '../profile-form/profile-form';
import { ProtectedRouteElement } from '../protected-route';
import { UnauthorizedUserRouteElement } from '../unauthorized-user-route';
import styles from './app.module.css';


const App: FC = () => {
  const location = useLocation();
  const background = location.state && location.state.background;
  const loadStatus = useSelector(getLoadStatus);
  const navigate = useNavigate();
  const dispatch = useDispatch();


  const handleCloseModal = (route: string = '/') => {
    dispatch(clearActiveIngredient())
    navigate(route)
  }

  useEffect(() => {
    dispatch(fetchGetUserDataAsync())
    dispatch(fetchIngredientListAsync())
  }, [dispatch])


  return (
    <div className={styles.app}>
      <AppHeader />
      {loadStatus === 'idle' ?
        <div className={styles.content}>
          <Routes location={background || location}>
            <Route path={MAIN_ROUTE} element={<Home />} />
            <Route path={FEED_ROUTE} element={<Feed />} />
            <Route path={FEED_ID_ROUTE} element={<OrderInfo />} />
            <Route path={LOGIN_ROUTE} element={<UnauthorizedUserRouteElement element={<Login />} />} />
            <Route path={REGISTER_ROUTE} element={<UnauthorizedUserRouteElement element={<Register />} />} />
            <Route path={FORGOT_PASSWORD_ROUTE} element={<UnauthorizedUserRouteElement element={<ForgotPassword />} />} />
            <Route path={RESET_PASSWORD_ROUTE} element={<UnauthorizedUserRouteElement element={<ResetPassword />} />} />
            <Route path={MAIN_ROUTE} element={<ProtectedRouteElement element={<Profile />} />}>
              <Route path={PROFILE_ROUTE} element={<ProtectedRouteElement element={<ProfileForm />} />} />
              <Route path={PROFILE_ORDERS_ROUTE} element={<ProtectedRouteElement element={<OrderHistory />} />} />
            </Route>
            <Route path={PROFILE_ORDER_ID_ROUTE} element={<ProtectedRouteElement element={<OrderInfo />} />} />
            <Route path={INGREDIENT_ID_ROUTE} element={<Ingredient />} />
            {/* {<Route path="*" element={<NotFound404 />} /> */}
          </Routes>
          {background && (
            <Routes>
              <Route path={INGREDIENT_ID_ROUTE} element={
                <Modal handleClose={() => handleCloseModal()}>
                  <IngredientDetails />
                </Modal>
              } />
              <Route path={FEED_ID_ROUTE} element={
                <Modal handleClose={() => handleCloseModal(FEED_ROUTE)}>
                  <OrderInfo />
                </Modal>
              } />
              <Route path={PROFILE_ORDER_ID_ROUTE} element={
                <Modal handleClose={() => handleCloseModal(PROFILE_ORDERS_ROUTE)}>
                  <OrderInfo />
                </Modal>
              } />
            </Routes>
          )}
        </div>
        :
        <Loader />
      }
    </div >
  );
}

export default App;
