
import { BurgerIcon, ListIcon, Logo, ProfileIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import React from 'react';
import AppHeaderStyle from './app-header.module.css';

class AppHeader extends React.Component {
    render() {
        return (
            <header className={AppHeaderStyle.header}>
                <div className={AppHeaderStyle.content}>
                    <div className={AppHeaderStyle.navigation}>
                        <nav>
                            <a href="/#" className={AppHeaderStyle.navigation_link_active}>
                                <BurgerIcon type="primary" />
                                <span className={AppHeaderStyle.name}>Конструктор</span>
                            </a>
                        </nav>
                        <nav>
                            <a href="/#" className={AppHeaderStyle.navigation_link}>
                                <ListIcon type="primary" className={AppHeaderStyle.icon} />
                                <span className={AppHeaderStyle.name}>Лента заказов</span>
                            </a>
                        </nav>
                    </div>
                    <nav>
                        <a href="/#" className={`${AppHeaderStyle.navigation} ${AppHeaderStyle.navigation_link}`}>
                            <ProfileIcon type="primary" className={AppHeaderStyle.icon} />
                            <span className={AppHeaderStyle.name}>Личный кабинет</span>
                        </a>
                    </nav>
                </div>
                <div className={AppHeaderStyle.logo}>
                    <Logo />
                </div>
            </header>
        );
    }
}

export default AppHeader 