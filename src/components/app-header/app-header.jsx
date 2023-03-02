import { BurgerIcon, ListIcon, Logo, ProfileIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './app-header.module.css';
import { useNavigate, useLocation } from 'react-router-dom';

const AppHeader = () => {
    const { pathname } = useLocation();
    const navigate = useNavigate();

    const handleConstructorClick = e => {
        e.preventDefault()
        navigate('/')
    }

    const handleProfileClick = e => {
        e.preventDefault()
        navigate('/profile')
    }



    return (
        <header className={styles.header}>
            <nav className={styles.content}>
                <div className={styles.navigation}>
                    <a href="/#" className={` ${styles.navigation_link} ${pathname === '/' && styles.navigation_link_active}`} onClick={handleConstructorClick}>
                        <BurgerIcon type="primary" />
                        <span className={styles.name}>Конструктор</span>
                    </a>
                    <a href="/#" className={styles.navigation_link}>
                        <ListIcon type="primary" className={styles.icon} />
                        <span className={styles.name}>Лента заказов</span>
                    </a>
                </div>
                <a href="/#" className={`${styles.navigation} ${styles.navigation_link} ${pathname === '/profile' && styles.navigation_link_active}`} onClick={handleProfileClick}>
                    <ProfileIcon type="primary" className={styles.icon} />
                    <span className={styles.name}>Личный кабинет</span>
                </a>
            </nav>
            <div className={styles.logo}>
                <Logo />
            </div>
        </header>
    );
}

export default AppHeader 