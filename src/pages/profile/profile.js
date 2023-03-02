import { Input, PasswordInput } from "@ya.praktikum/react-developer-burger-ui-components";
import { useDispatch, useSelector } from 'react-redux';
import { Navigate, useNavigate } from 'react-router-dom';
import { useState } from "react";
import styles from './profile.module.css';
import userSlice, { fetchLogoutAsync, getLoginStatus, getUser } from "../../services/authSlice";
import Loader from "../../components/loader/loader";

const INITIAL_STATE = {
  name: '',
  email: '',
  password: ''
}

const Profile = () => {
  const dispatch = useDispatch();
  const loginStatus = useSelector(getLoginStatus);
  const user = useSelector(getUser);
  const navigate = useNavigate();
  const [formValue, setFormValue] = useState(INITIAL_STATE)

  const handleFormChange = e => setFormValue({ ...formValue, [e.target.name]: e.target.value })

  const handleLogoutClick = e => {
    dispatch(fetchLogoutAsync()).then(() => {
      navigate('/')
    })
  }

  console.log(user);

  if (!user?.email) return <Navigate to='/login' />

  return (
    <div className={styles.container}>
      <div className={`mr-15 ${styles.menu}`}>
        <ul className="text text_type_main-medium">
          <li className={`${styles.menuItem} ${styles.menuItemActive}`}>Профиль</li>
          <li className={`${styles.menuItem}`}>История заказов</li>
          <li className={`${styles.menuItem}`} onClick={() => handleLogoutClick()}>Выход</li>
        </ul>
        <p className={`mt-20 ${styles.info}`}>В этом разделе вы можете изменить свои персональные данные</p>
      </div>
      <div>
        <form>
          <Input
            type={'text'}
            placeholder={'Имя'}
            onChange={handleFormChange}
            value={formValue.name}
            name={'name'}
            size={'default'}
            icon={'EditIcon'}
          />
          <Input
            type={'text'}
            placeholder={'Логин'}
            onChange={handleFormChange}
            value={formValue.email}
            name={'email'}
            size={'default'}
            extraClass="mt-6"
            icon={'EditIcon'}
          />
          <PasswordInput
            onChange={handleFormChange}
            value={formValue.password}
            name={'password'}
            extraClass={`mt-6`}
            icon={'EditIcon'}
          />
        </form>
      </div>
      {loginStatus === 'loading' && <Loader />}
    </div>
  );
}

export default Profile;
