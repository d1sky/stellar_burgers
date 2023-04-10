import { useEffect, FC } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Route, Routes, useLocation, useNavigate } from 'react-router-dom';
import { AppDispatch } from "../../services";
import styles from './app.module.css';

import ForgotPassword from '../../pages/forgot-password/forgot-password';
import Home from '../../pages/home/home';
import Ingredient from '../../pages/ingredient/ingredient';
import Login from '../../pages/login/login';
import Profile from '../../pages/profile/profile';
import Register from '../../pages/register/register';
import ResetPassword from '../../pages/reset-password/reset-password';
import { FORGOT_PASSWORD_ROUTE, INGREDIENT_ID_ROUTE, LOGIN_ROUTE, MAIN_ROUTE, PROFILE_ORDERS_ROUTE, PROFILE_ROUTE, REGISTER_ROUTE, RESET_PASSWORD_ROUTE, FEED_ROUTE, FEED_ID_ROUTE, PROFILE_ORDER_ID_ROUTE } from '../../route';
import { remove } from '../../services/activeIngredientSlice';
import { fetchGetUserDataAsync, getLoadStatus } from '../../services/authSlice';
import { fetchIngredientListAsync } from '../../services/ingredientListSlice';
import AppHeader from '../app-header/app-header';
import IngredientDetails from '../ingredient-details/ingredient-details';
import Loader from '../loader/loader';
import Modal from '../modal/modal';
import OrderHistory from '../order-history/order-history';
import ProfileForm from '../profile-form/profile-form';
import { ProtectedRouteElement } from '../protected-route';
import { UnauthorizedUserRouteElement } from '../unauthorized-user-route';
import Feed from '../../pages/feed/feed';

import FeedOrder from '../../pages/feed-order/feed-order';
import Order from '../../pages/order/order';


const App: FC = () => {
  const location = useLocation();
  const background = location.state && location.state.background;
  const loadStatus = useSelector(getLoadStatus);
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();


  const handleCloseModal = () => {
    dispatch(remove())
    navigate('/')
  }

  useEffect(() => {
    dispatch(fetchGetUserDataAsync())
    dispatch(fetchIngredientListAsync())
  }, [dispatch])


  return (
    <div className="App">
      <AppHeader />
      {loadStatus === 'idle' ?
        <div className={styles.content}>
          <Routes location={background || location}>
            <Route path={MAIN_ROUTE} element={<Home />} />
            <Route path={FEED_ROUTE} element={<Feed />} />
            <Route path={FEED_ID_ROUTE} element={<FeedOrder />} />
            <Route path={LOGIN_ROUTE} element={<UnauthorizedUserRouteElement element={<Login />} />} />
            <Route path={REGISTER_ROUTE} element={<UnauthorizedUserRouteElement element={<Register />} />} />
            <Route path={FORGOT_PASSWORD_ROUTE} element={<UnauthorizedUserRouteElement element={<ForgotPassword />} />} />
            <Route path={RESET_PASSWORD_ROUTE} element={<UnauthorizedUserRouteElement element={<ResetPassword />} />} />
            <Route path={MAIN_ROUTE} element={<ProtectedRouteElement element={<Profile />} />}>
              <Route path={PROFILE_ROUTE} element={<ProtectedRouteElement element={<ProfileForm />} />} />
              <Route path={PROFILE_ORDERS_ROUTE} element={<ProtectedRouteElement element={<OrderHistory />} />} />
            </Route>
            <Route path={PROFILE_ORDER_ID_ROUTE} element={<ProtectedRouteElement element={<Order />} />} />
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
        </div>
        :
        <Loader />
      }
    </div >
  );
}

export default App;
