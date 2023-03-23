import { Button, Input, PasswordInput } from "@ya.praktikum/react-developer-burger-ui-components";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate, useLocation } from "react-router-dom";
import { LOGIN_ROUTE } from "../../route";
import { fetchResetPasswordAsync } from "../../services/authSlice";
import styles from './reset-password.module.css';

const INITIAL_STATE = {
  token: '',
  password: ''
}

const ResetPassword = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation()
  const [formValue, setFormValue] = useState(INITIAL_STATE)
  const [error, setError] = useState(false)
  const reset = location.state?.reset

  useEffect(() => {
    if (!reset) {
      navigate(LOGIN_ROUTE)
    }
  }, [reset, navigate])

  const handleFormChange = e => setFormValue({ ...formValue, [e.target.name]: e.target.value })

  const handleLoginClick = e => {
    e.preventDefault()
    navigate(LOGIN_ROUTE)
  }

  const handleOnFormSubmit = (e) => {
    e.preventDefault()
    dispatch(fetchResetPasswordAsync(formValue)).then((data) => {
      if (data?.payload?.success) {
        navigate(LOGIN_ROUTE)
      } else {
        setError(true)
      }
    })
  }

  return (
    <div className={styles.container}>
      <h2 className={'text_type_main-medium'}>Восстановление пароля</h2>
      <form onSubmit={handleOnFormSubmit} className={styles.form}>
        <PasswordInput
          placeholder={'Введите новый пароль'}
          onChange={handleFormChange}
          value={formValue.password}
          name={'password'}
          extraClass={`mt-6`}
          error={error}
        />
        <Input
          type={'text'}
          placeholder={'Введите код из письма'}
          onChange={handleFormChange}
          value={formValue.token}
          name={'token'}
          errorText={'Ошибка'}
          size={'default'}
          extraClass="mt-6"
          error={error}
        />
        <Button htmlType="submit" type="primary" size="medium" extraClass={`mt-6`}>
          Сохранить
        </Button>
      </form>

      <p className="text text_type_main-small mt-20">
        Вспомнили пароль? <a className={styles.link} href="/" onClick={handleLoginClick}>Войти</a>
      </p>
    </div>
  );
}

export default ResetPassword;
