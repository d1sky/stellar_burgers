import { Button, EmailInput, Input, PasswordInput } from "@ya.praktikum/react-developer-burger-ui-components";
import { useState } from "react";
import styles from './profile.module.css';

const INITIAL_STATE = {
  name: '',
  email: '',
  password: ''
}

const Profile = () => {
  const [formValue, setFormValue] = useState(INITIAL_STATE)

  const handleFormChange = e => setFormValue({ ...formValue, [e.target.name]: e.target.value })

  return (
    <div className={styles.container}>
      <div className={`mr-15 ${styles.menu}`}>
        <ul className="text text_type_main-medium">
          <li className={`${styles.menuItem} ${styles.menuItemActive}`}>Профиль</li>
          <li className={`${styles.menuItem}`}>История заказов</li>
          <li className={`${styles.menuItem}`}>Выход</li>
        </ul>
        <p className={`mt-20 ${styles.info}`}>В этом разделе вы можете изменить свои персональные данные</p>
      </div>
      <div>
        <form>
          <Input
            type={'text'}
            placeholder={'Имя'}
            onChange={handleFormChange}
            value={formValue.name}
            name={'name'}
            size={'default'}
            icon={'EditIcon'}
          />
          <Input
            type={'text'}
            placeholder={'Логин'}
            onChange={handleFormChange}
            value={formValue.email}
            name={'email'}
            size={'default'}
            extraClass="mt-6"
            icon={'EditIcon'}
          />
          <PasswordInput
            onChange={handleFormChange}
            value={formValue.password}
            name={'password'}
            extraClass={`mt-6`}
            icon={'EditIcon'}
          />
        </form>
      </div>
    </div>
  );
}

export default Profile;
