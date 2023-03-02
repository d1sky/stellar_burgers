import { Button, Input, PasswordInput } from "@ya.praktikum/react-developer-burger-ui-components";
import { useState } from "react";
import styles from './reset-password.module.css';

const INITIAL_STATE = {
  email: '',
  password: ''
}

const ResetPassword = () => {
  const [formValue, setFormValue] = useState(INITIAL_STATE)

  const handleFormChange = e => setFormValue({ ...formValue, [e.target.name]: e.target.value })

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
        />
        <Input
          type={'text'}
          placeholder={'Введите код из письма'}
          onChange={handleFormChange}
          value={formValue.name}
          name={'name'}
          errorText={'Ошибка'}
          size={'default'}
          extraClass="mt-6"
        />
      </form>
      <Button htmlType="button" type="primary" size="medium" extraClass={`mt-6`}>
        Сохранить
      </Button>
      <p className="text text_type_main-small mt-20">Вспомнили пароль? <a className={styles.link} href="/">Войти</a></p>
    </div>
  );
}

export default ResetPassword;
