
import { Button, Input, PasswordInput } from "@ya.praktikum/react-developer-burger-ui-components";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from 'react-redux';
import Loader from "../../components/loader/loader";
import { fetchUpdateUserDataAsync, getLoginStatus, getUser } from "../../services/authSlice";
import styles from './profile-form.module.css';

const INITIAL_STATE = {
    name: '',
    email: '',
    password: ''
}

const ProfileForm = () => {
    const dispatch = useDispatch();
    const user = useSelector(getUser);
    const [formValue, setFormValue] = useState(INITIAL_STATE)
    const loginStatus = useSelector(getLoginStatus);

    useEffect(() => {
        setFormValue(user)
    }, [user])

    const handleCancelClick = () => {
        setFormValue(user)
    }

    const handleFormChange = e => setFormValue({ ...formValue, [e.target.name]: e.target.value })

    return (
        <div className={styles.container}>
            <form onSubmit={() => dispatch(fetchUpdateUserDataAsync(formValue))} >
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
                    value={formValue.password || ''}
                    name={'password'}
                    extraClass={`mt-6`}
                    icon={'EditIcon'}
                />
                <div className={`mt-6`}>
                    <Button htmlType="submit" type="primary" extraClass={`mr-6`} >Сохранить</Button>
                    <Button htmlType="reset" type="primary" onClick={handleCancelClick}>Отмена</Button>
                </div>
            </form>
            {loginStatus === 'loading' && <Loader />}
        </div>
    )
}

export default ProfileForm 
