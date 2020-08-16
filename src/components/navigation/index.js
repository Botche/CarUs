import React from 'react';

import NavigationItem from './navigation-item';
import userFunctions from '../../services/user';

import styles from './index.module.scss';

function Navigation(props) {
    const routes = userFunctions.isLoggedIn() === false ? [
        {
            title: 'Home',
            link: '/',
        },
        {
            title: 'Authenticate',
            link: '/user',
        },
    ] : [
        {
            title: 'Home',
            link: '/',
        },
        {
            title: 'Add car',
            link: '/car/add',
        },
        {
            title: 'Rented cars',
            link: '/user/rented-cars',
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