import { useNavigate } from 'react-router-dom';
import { Button, EmailInput, PasswordInput } from "@ya.praktikum/react-developer-burger-ui-components";
import { useState } from "react";
import styles from './login.module.css';

const INITIAL_STATE = {
  email: '',
  password: ''
}

const Login = () => {
  const [formValue, setFormValue] = useState(INITIAL_STATE);
  const navigate = useNavigate();

  const handleFormChange = e => setFormValue({ ...formValue, [e.target.name]: e.target.value });

  const handleRegisterClick = e => {
    e.preventDefault()
    navigate('/register')
  }

  const handleForgotPasswordClick = e => {
    e.preventDefault()
    navigate('/forgot-password')
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
        />
        <PasswordInput
          onChange={handleFormChange}
          value={formValue.password}
          name={'password'}
          extraClass={`mt-6`}
        />
      </form>
      <Button htmlType="button" type="primary" size="medium" extraClass={`mt-6`}>
        Войти
      </Button>
      <p className="text text_type_main-small mt-20">
        Вы новый пользователь? <a className={styles.link} href="" onClick={handleRegisterClick}>Зарегистрироваться</a>
        </p>
      <p className="text text_type_main-small mt-4">
        Забыли пароль? <a className={styles.link} href="" onClick={handleForgotPasswordClick}>Восстановить пароль</a>
        </p>
    </div>
  );
}

export default Login;
