import React from 'react';
import { Link } from 'react-router-dom';

import styles from './index.module.scss';

function NavigationItem(props) {
    return (
        <li className={styles.item}>
            <Link className={styles.link} to={props.link}>{props.children}</Link>
        </li>
    )
}

export default NavigationItem;