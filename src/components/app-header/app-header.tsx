import { BurgerIcon, ListIcon, Logo, ProfileIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { FC } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { MAIN_ROUTE, PROFILE_ROUTE } from '../../route';
import styles from './app-header.module.css';

const AppHeader: FC = () => {
    const { pathname } = useLocation();

    return (
        <header className={styles.header}>
            <nav className={styles.content}>
                <div className={styles.navigation}>
                    <NavLink to={MAIN_ROUTE} className={` ${styles.navigation_link} ${pathname === MAIN_ROUTE && styles.navigation_link_active}`}>
                        <BurgerIcon type="primary" />
                        <span className={styles.name}>Конструктор</span>
                    </NavLink>
                    <a href="/#" className={styles.navigation_link}>
                        <div className={styles.icon}>
                            <ListIcon type="primary" />
                        </div>
                        <span className={styles.name}>Лента заказов</span>
                    </a>
                </div>
                <NavLink to={PROFILE_ROUTE} className={`${styles.navigation} ${styles.navigation_link} ${pathname.includes(PROFILE_ROUTE) && styles.navigation_link_active}`}>
                    <div className={styles.icon}>
                        <ProfileIcon type="primary" />
                    </div>
                    <span className={styles.name}>Личный кабинет</span>
                </NavLink>
            </nav>
            <div className={styles.logo}>
                <Logo />
            </div>
        </header >
    );
}

export default AppHeader 