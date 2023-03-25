import { Button, EmailInput } from "@ya.praktikum/react-developer-burger-ui-components";
import { FC, useState, ChangeEvent, FormEvent } from "react";
import { useDispatch } from "react-redux";
import { useNavigate, Link } from 'react-router-dom';
import { AppDispatch } from "../../services";
import { LOGIN_ROUTE, RESET_PASSWORD_ROUTE } from "../../route";
import { fetchForgotPasswordAsync } from "../../services/authSlice";
import styles from './forgot-password.module.css';

export type TPasswordResetData = {
  email: string;
}

const INITIAL_STATE: TPasswordResetData = {
  email: '',
}

const ForgotPassword: FC = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  const [formValue, setFormValue] = useState<TPasswordResetData>(INITIAL_STATE)

  const handleFormChange = (event: ChangeEvent<HTMLInputElement>) => setFormValue({ ...formValue, [event.target.name]: event.target.value })

  const handleOnFormSubmit = (event: FormEvent) => {
    event.preventDefault()
    dispatch(fetchForgotPasswordAsync(formValue)).then((data) => {
      if (data?.payload?.success) {
        navigate(RESET_PASSWORD_ROUTE, { state: { reset: true } })
      }
    })
  }

  return (
    <div className={styles.container}>
      <h2 className={'text_type_main-medium'}>Восстановление пароля</h2>
      <form onSubmit={handleOnFormSubmit} className={styles.form}>
        <EmailInput
          placeholder={'Укажите e-mail'}
          onChange={handleFormChange}
          value={formValue.email}
          name={'email'}
          isIcon={false}
          extraClass={`mt-6`}
        />
        <Button htmlType="submit" type="primary" size="medium" extraClass={`mt-6`}>
          Восстановить
        </Button>
      </form>

      <p className="text text_type_main-small mt-20">
        Вспомнили пароль? <Link className={styles.link} to={LOGIN_ROUTE}>Войти</Link>
      </p>
    </div>
  );
}

export default ForgotPassword;
