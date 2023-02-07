import { BurgerIcon, ListIcon, Logo, ProfileIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './app-header.module.css';

const AppHeader = () => {
    return (
        <header className={styles.header}>
            <nav className={styles.content}>
                <div className={styles.navigation}>
                    <a href="/#" className={styles.navigation_link_active}>
                        <BurgerIcon type="primary" />
                        <span className={styles.name}>Конструктор</span>
                    </a>
                    <a href="/#" className={styles.navigation_link}>
                        <ListIcon type="primary" className={styles.icon} />
                        <span className={styles.name}>Лента заказов</span>
                    </a>
                </div>
                <a href="/#" className={`${styles.navigation} ${styles.navigation_link}`}>
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