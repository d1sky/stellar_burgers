
import React from 'react'; // импорт библиотеки
import { Logo } from '@ya.praktikum/react-developer-burger-ui-components'
import { BurgerIcon, ListIcon, ProfileIcon } from '@ya.praktikum/react-developer-burger-ui-components'
import AppHeaderStyle from './AppHeaderStyle.module.css';

class AppHeader extends React.Component {
    render() {
        return (
            <header className={AppHeaderStyle.header}>
                <div className={AppHeaderStyle.content}>
                    <div className={AppHeaderStyle.navigation}>
                        <nav className={AppHeaderStyle.navigation_link_active}>
                            <BurgerIcon type="primary" />
                            <span className={AppHeaderStyle.name}>Конструктор</span>
                        </nav>
                        <nav className={AppHeaderStyle.navigation_link}>
                            <ListIcon type="primary" className={AppHeaderStyle.icon} />
                            <span className={AppHeaderStyle.name}>Лента заказов</span>
                        </nav>
                    </div>

                    <nav className={`${AppHeaderStyle.navigation} ${AppHeaderStyle.navigation_link}`}>
                        <ProfileIcon type="primary" className={AppHeaderStyle.icon} />
                        <span className={AppHeaderStyle.name}>Личный кабинет</span>
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