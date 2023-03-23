import { Button, EmailInput, Input, PasswordInput } from "@ya.praktikum/react-developer-burger-ui-components";
import { useState } from "react";
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { LOGIN_ROUTE } from "../../route";
import { fetchRegisterAsync } from "../../services/authSlice";
import styles from './register.module.css';

const INITIAL_STATE = {
  email: '',
  password: ''
}

const Register = () => {
  const [formValue, setFormValue] = useState(INITIAL_STATE)
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleFormChange = e => setFormValue({ ...formValue, [e.target.name]: e.target.value })

  const handleLoginClick = e => {
    e.preventDefault()
    navigate(LOGIN_ROUTE)
  }

  const handleOnFormSubmit = e => {
    e.preventDefault()
    dispatch(fetchRegisterAsync(formValue))
  }

  return (
    <div className={styles.container}>
      <h2 className={'text_type_main-medium'}>Регистрация</h2>
      <form onSubmit={handleOnFormSubmit} className={styles.form}>
        <Input
          type={'text'}
          placeholder={'Имя'}
          onChange={handleFormChange}
          value={formValue.name}
          name={'name'}
          errorText={'Ошибка'}
          size={'default'}
          extraClass="ml-1"
        />
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
          Зарегистрироваться
        </Button>
      </form>
      <p className="text text_type_main-small mt-20">
        Уже зарегистрированы? <a className={styles.link} href="/" onClick={handleLoginClick}>Войти</a>
      </p>
    </div>
  );
}

export default Register;
