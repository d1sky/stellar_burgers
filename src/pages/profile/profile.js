import { useDispatch } from 'react-redux';
import { useNavigate, useLocation, Outlet } from 'react-router-dom';
import { fetchLogoutAsync } from "../../services/authSlice";
import styles from './profile.module.css';

const Profile = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { pathname } = useLocation();

  const handleLogoutClick = e => {
    dispatch(fetchLogoutAsync()).then(() => {
      navigate('/login')
    })
  }

  return (
    <div className={styles.container}>
      <div className={`mr-15 ${styles.menu}`}>
        <ul className="text text_type_main-medium">
          <li className={`${styles.menuItem} ${pathname === ('/profile') && styles.menuItemActive}`} onClick={() => { navigate('/profile') }}>Профиль</li>
          <li className={`${styles.menuItem} ${pathname === ('/profile/orders') && styles.menuItemActive}`} onClick={() => { navigate('/profile/orders') }}>История заказов</li>
          <li className={`${styles.menuItem}`} onClick={() => handleLogoutClick()}>Выход</li>
        </ul>
        <p className={`mt-20 ${styles.info}`}>В этом разделе вы можете изменить свои персональные данные</p>
      </div>
      <Outlet />
    </div>
  );
}

export default Profile;
