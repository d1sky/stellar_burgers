import { Button, EmailInput } from "@ya.praktikum/react-developer-burger-ui-components";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from 'react-router-dom';
import { fetchForgotPasswordAsync } from "../../services/authSlice";
import styles from './forgot-password.module.css';

const INITIAL_STATE = {
  email: '',
  password: ''
}

const ForgotPassword = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [formValue, setFormValue] = useState(INITIAL_STATE)
  const [error, setError] = useState(false)

  const handleFormChange = e => setFormValue({ ...formValue, [e.target.name]: e.target.value })

  const handleLoginClick = e => {
    e.preventDefault()
    navigate('/login')
  }

  const handleForgotPasswordClick = e => {
    dispatch(fetchForgotPasswordAsync(formValue)).then((data) => {
      if (data?.payload?.success) {
        navigate('/reset-password')
      } else {
        setError(true)
      }
    })
  }

  return (
    <div className={styles.container}>
      <h2 className={'text_type_main-medium'}>Восстановление пароля</h2>
      <form>
        <EmailInput
          placeholder={'Укажите e-mail'}
          onChange={handleFormChange}
          value={formValue.email}
          name={'email'}
          isIcon={false}
          extraClass={`mt-6`}
          error={error}
        />
      </form>
      <Button htmlType="button" type="primary" size="medium" extraClass={`mt-6`} onClick={handleForgotPasswordClick}>
        Восстановить
      </Button>
      <p className="text text_type_main-small mt-20">
        Вспомнили пароль? <a className={styles.link} href="/" onClick={handleLoginClick}>Войти</a>
      </p>
    </div>
  );
}

export default ForgotPassword;
