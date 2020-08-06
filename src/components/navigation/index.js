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

    const classNavigationName = `navigation-${props.navigationType}`;
    const navigationStyle = styles[classNavigationName];

    return (
        <ul className={navigationStyle}>
            {navigationItems}
        </ul>
    );
}

export default Navigation;