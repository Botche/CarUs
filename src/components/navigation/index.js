import React from 'react';

import NavigationItem from './navigation-item';

import styles from './index.module.scss';

function Navigation(props) {
    const routes = [
        {
            title: 'Home',
            link: '/',
        },
        {
            title: 'Login',
            link: '/user/login',
        },
        {
            title: 'Register',
            link: '/user/register',
        },
        {
            title: 'Logout',
            link: '/user/logout',
        }
    ];

    const navigationItems = routes.map((route) => <NavigationItem link={route.link} key={route.title}>{route.title}</NavigationItem>)

    return (
        <ul className={styles.navigation}>
            {navigationItems}
        </ul>
    );
}

export default Navigation;