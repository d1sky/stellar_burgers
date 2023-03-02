import { Button, EmailInput, PasswordInput } from "@ya.praktikum/react-developer-burger-ui-components";
import { useState } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import Loader from "../../components/loader/loader";
import { fetchLoginAsync, getLoginStatus } from "../../services/authSlice";
import styles from './login.module.css';

const INITIAL_STATE = {
  email: '',
  password: ''
}

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [formValue, setFormValue] = useState(INITIAL_STATE);
  const [error, setError] = useState(false)
  const loginStatus = useSelector(getLoginStatus);

  const handleFormChange = e => {
    setError(false)
    setFormValue({ ...formValue, [e.target.name]: e.target.value });
  }

  const handleRegisterClick = e => {
    e.preventDefault()
    navigate('/register')
  }

  const handleForgotPasswordClick = e => {
    e.preventDefault()
    navigate('/forgot-password')
  }

  const handleLoginClick = e => {
    e.preventDefault()
    dispatch(fetchLoginAsync(formValue)).then((data) => {
      if (data?.payload?.success) {
        navigate('/')
      } else {
        setError(true)
      }
    })
  }

  return (
    <div className={styles.container}>
      <h2 className={'text_type_main-medium'}>Вход</h2>
      <form>
        <EmailInput
          onChange={handleFormChange}
          value={formValue.email}
          name={'email'}
          isIcon={false}
          extraClass={`mt-6`}
          error={error}
        />
        <PasswordInput
          onChange={handleFormChange}
          value={formValue.password}
          name={'password'}
          extraClass={`mt-6`}
          error={error}
        />
      </form>
      <Button htmlType="button" type="primary" size="medium" extraClass={`mt-6`} onClick={handleLoginClick}>
        Войти
      </Button>
      <p className="text text_type_main-small mt-20">
        Вы новый пользователь? <a className={styles.link} href="/" onClick={handleRegisterClick}>Зарегистрироваться</a>
      </p>
      <p className="text text_type_main-small mt-4">
        Забыли пароль? <a className={styles.link} href="/" onClick={handleForgotPasswordClick}>Восстановить пароль</a>
      </p>
      {loginStatus === 'loading' && <Loader />}
    </div>
  );
}

export default Login;
