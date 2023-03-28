import { Button, EmailInput, PasswordInput } from "@ya.praktikum/react-developer-burger-ui-components";
import { useState, FormEvent, ChangeEvent } from "react";
import { useDispatch } from 'react-redux';
import { useNavigate, Link } from 'react-router-dom';
import { AppDispatch } from "../../services";
import { FORGOT_PASSWORD_ROUTE, REGISTER_ROUTE } from "../../route";
import { fetchLoginAsync } from "../../services/authSlice";
import styles from './login.module.css';

export type TLoginData = {
  email: string;
  password: string;
}

const INITIAL_STATE: TLoginData = {
  email: '',
  password: ''
}

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  const [formValue, setFormValue] = useState<TLoginData>(INITIAL_STATE);

  const handleFormChange = (event: ChangeEvent<HTMLInputElement>) => {
    setFormValue({ ...formValue, [event.target.name]: event.target.value });
  }

  const handleOnFormSubmit = (event: FormEvent) => {
    event.preventDefault()
    dispatch(fetchLoginAsync(formValue)).then(() => {
        navigate('/')
    })
  }


  return (
    <div className={styles.container}>
      <h2 className={'text_type_main-medium'}>Вход</h2>
      <form className={styles.form} onSubmit={handleOnFormSubmit}>
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
        <Button htmlType="submit" type="primary" size="medium" extraClass={`mt-6`}>
          Войти
        </Button>
      </form>
      <p className="text text_type_main-small mt-20">
        Вы новый пользователь? <Link className={styles.link} to={REGISTER_ROUTE}>Войти</Link>
      </p>
      <p className="text text_type_main-small mt-4">
        Забыли пароль? <Link className={styles.link} to={FORGOT_PASSWORD_ROUTE}>Войти</Link>
      </p>
    </div>
  );
}

export default Login;
