import { Button, EmailInput, Input, PasswordInput } from "@ya.praktikum/react-developer-burger-ui-components";
import { ChangeEvent, FormEvent, useState } from "react";
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { AppDispatch } from "../../services";
import { LOGIN_ROUTE } from "../../route";
import { fetchRegisterAsync } from "../../services/authSlice";
import styles from './register.module.css';

export type TRegisterData = {
  name: string;
  email: string;
  password: string;
}

const INITIAL_STATE: TRegisterData = {
  name: '',
  email: '',
  password: ''
}

const Register = () => {
  const [formValue, setFormValue] = useState<TRegisterData>(INITIAL_STATE)
  const dispatch = useDispatch<AppDispatch>();

  const handleFormChange = (event: ChangeEvent<HTMLInputElement>) => setFormValue({ ...formValue, [event.target.name]: event.target.value })

  const handleOnFormSubmit = (event: FormEvent) => {
    event.preventDefault()
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
        Уже зарегистрированы? <Link className={styles.link} to={LOGIN_ROUTE}>Войти</Link>
      </p>
    </div>
  );
}

export default Register;
