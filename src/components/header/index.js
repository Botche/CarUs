import React from 'react';

import Navigation from '../navigation';

import styles from './index.module.scss';

function Header(props) {
    return (
        <header className={styles.header}>
            <Navigation navigationType="header" />
        </header>
    );
}

export default Header;