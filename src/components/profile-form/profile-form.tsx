
import { Button, Input, PasswordInput } from "@ya.praktikum/react-developer-burger-ui-components";
import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import { useDispatch, useSelector } from '../../hooks/hooks';
import { fetchUpdateUserDataAsync, getUser } from "../../services/authSlice";
import styles from './profile-form.module.css';

export type TUserData = {
    name: string;
    email: string;
    password: string;
}

const INITIAL_STATE: TUserData = {
    name: '',
    email: '',
    password: ''
}

const ProfileForm = () => {
    const dispatch = useDispatch();
    const user = useSelector(getUser);
    const [formValue, setFormValue] = useState<TUserData>(INITIAL_STATE)
    const [isEdit, setEdit] = useState(false)

    useEffect(() => {
        setFormValue(user)
    }, [user])

    const handleCancelClick = () => {
        setFormValue(user)
        setEdit(false)
    }

    const handleFormChange = (event: ChangeEvent<HTMLInputElement>) => {
        setEdit(true)
        setFormValue({ ...formValue, [event.target.name]: event.target.value })
    }

    const handleOnFormSubmit = (event: FormEvent) => {
        event.preventDefault()
        dispatch(fetchUpdateUserDataAsync({ ...formValue }))
        setEdit(false)
    }

    return (
        <div className={styles.container}>
            <form
                onSubmit={handleOnFormSubmit}
            >
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
                {isEdit &&
                    <div className={`mt-6`}>
                        <Button htmlType="submit" type="primary" extraClass={`mr-6`} >Сохранить</Button>
                        <Button htmlType="reset" type="primary" onClick={handleCancelClick}>Отмена</Button>
                    </div>}
            </form>
        </div>
    )
}

export default ProfileForm 
