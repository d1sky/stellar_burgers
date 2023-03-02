import { Button, Input, PasswordInput } from "@ya.praktikum/react-developer-burger-ui-components";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { fetchResetPasswordAsync } from "../../services/authSlice";
import styles from './reset-password.module.css';

const INITIAL_STATE = {
  code: '',
  password: ''
}

const ResetPassword = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [formValue, setFormValue] = useState(INITIAL_STATE)
  const [error, setError] = useState(false)

  const handleFormChange = e => setFormValue({ ...formValue, [e.target.name]: e.target.value })

  const handleLoginClick = e => {
    e.preventDefault()
    navigate('/login')
  }

  const handleResetPasswordClick = () => {
    dispatch(fetchResetPasswordAsync(formValue)).then((data) => {
      if (data?.payload?.success) {
        navigate('/login')
      } else {
        setError(true)
      }
    })
  }

  return (
    <div className={styles.container}>
      <h2 className={'text_type_main-medium'}>Восстановление пароля</h2>
      <form>
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
          value={formValue.code}
          name={'code'}
          errorText={'Ошибка'}
          size={'default'}
          extraClass="mt-6"
          error={error}
        />
      </form>
      <Button htmlType="button" type="primary" size="medium" extraClass={`mt-6`} onClick={handleResetPasswordClick}>
        Сохранить
      </Button>
      <p className="text text_type_main-small mt-20">
        Вспомнили пароль? <a className={styles.link} href="/" onClick={handleLoginClick}>Войти</a>
      </p>
    </div>
  );
}

export default ResetPassword;
