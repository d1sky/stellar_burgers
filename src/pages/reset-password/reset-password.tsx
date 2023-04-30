import { Button, Input, PasswordInput } from "@ya.praktikum/react-developer-burger-ui-components";
import { ChangeEvent, FC, FormEvent, useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useDispatch } from '../../hooks/hooks';
import { LOGIN_ROUTE } from "../../route";
import { fetchResetPasswordAsync } from "../../services/slices/auth/authSlice";
import styles from './reset-password.module.css';

export type TPasswordConfirmData = {
  token: string;
  password: string;
}

const INITIAL_STATE: TPasswordConfirmData = {
  token: '',
  password: ''
}

const ResetPassword: FC = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation()
  const [formValue, setFormValue] = useState<TPasswordConfirmData>(INITIAL_STATE)
  const reset = location.state?.reset

  useEffect(() => {
    if (!reset) {
      navigate(LOGIN_ROUTE)
    }
  }, [reset, navigate])

  const handleFormChange = (event: ChangeEvent<HTMLInputElement>) =>
    setFormValue({ ...formValue, [event.target.name]: event.target.value })

  const handleOnFormSubmit = (event: FormEvent) => {
    event.preventDefault()
    dispatch(fetchResetPasswordAsync(formValue)).then(() => {
      navigate(LOGIN_ROUTE)
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
        />
        <Button htmlType="submit" type="primary" size="medium" extraClass={`mt-6`}>
          Сохранить
        </Button>
      </form>

      <p className="text text_type_main-small mt-20">
        Вспомнили пароль? <Link className={styles.link} to={LOGIN_ROUTE}>Войти</Link>
      </p>
    </div>
  );
}

export default ResetPassword;
