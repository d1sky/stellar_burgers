import { Button, EmailInput } from "@ya.praktikum/react-developer-burger-ui-components";
import { useState } from "react";
import { useNavigate } from 'react-router-dom';
import styles from './forgot-password.module.css';

const INITIAL_STATE = {
  email: '',
  password: ''
}

const ForgotPassword = () => {
  const [formValue, setFormValue] = useState(INITIAL_STATE)
  const navigate = useNavigate();

  const handleFormChange = e => setFormValue({ ...formValue, [e.target.name]: e.target.value })

  const handleLoginClick = e => {
    e.preventDefault()
    navigate('/login')
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
        />
      </form>
      <Button htmlType="button" type="primary" size="medium" extraClass={`mt-6`}>
        Восстановить
      </Button>
      <p className="text text_type_main-small mt-20">
        Вспомнили пароль? <a className={styles.link} href="/" onClick={handleLoginClick}>Войти</a>
      </p>
    </div>
  );
}

export default ForgotPassword;
