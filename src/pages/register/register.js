import { useNavigate } from 'react-router-dom';
import { Button, EmailInput, Input, PasswordInput } from "@ya.praktikum/react-developer-burger-ui-components";
import { useState } from "react";
import styles from './register.module.css';

const INITIAL_STATE = {
  email: '',
  password: ''
}

const Register = () => {
  const [formValue, setFormValue] = useState(INITIAL_STATE)
  const navigate = useNavigate();

  const handleFormChange = e => setFormValue({ ...formValue, [e.target.name]: e.target.value })

  const handleLoginClick = e => {
    e.preventDefault()
    navigate('/login')
  }

  return (
    <div className={styles.container}>
      <h2 className={'text_type_main-medium'}>Регистрация</h2>
      <form>
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
      </form>
      <Button htmlType="button" type="primary" size="medium" extraClass={`mt-6`}>
        Зарегистрироваться
      </Button>
      <p className="text text_type_main-small mt-20">
        Уже зарегистрированы? <a className={styles.link} href="#" onClick={handleLoginClick}>Войти</a>
      </p>
    </div>
  );
}

export default Register;
