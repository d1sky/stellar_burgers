import { FC } from 'react';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import { useDispatch } from '../../hooks/hooks';
import { LOGIN_ROUTE, PROFILE_ORDERS_ROUTE, PROFILE_ROUTE } from '../../route';
import { fetchLogoutAsync } from "../../services/authSlice";
import styles from './profile.module.css';

const Profile: FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { pathname } = useLocation();

  const handleLogoutClick = () => {
    dispatch(fetchLogoutAsync()).then(() => {
      navigate(LOGIN_ROUTE)
    })
  }

  return (
    <div className={styles.container}>
      <div className={`mr-15 ${styles.menu}`}>
        <ul className="text text_type_main-medium">
          <li className={`${styles.menuItem} ${pathname === (PROFILE_ROUTE) && styles.menuItemActive}`} onClick={() => { navigate(PROFILE_ROUTE) }}>Профиль</li>
          <li className={`${styles.menuItem} ${pathname === (PROFILE_ORDERS_ROUTE) && styles.menuItemActive}`} onClick={() => { navigate(PROFILE_ORDERS_ROUTE) }}>История заказов</li>
          <li className={`${styles.menuItem}`} onClick={handleLogoutClick}>Выход</li>
        </ul>
        <p className={`mt-20 ${styles.info}`}>В этом разделе вы можете изменить свои персональные данные</p>
      </div>
      <Outlet />
    </div>
  );
}

export default Profile;
