import React from 'react';
import { Link } from 'react-router-dom';

import styles from './index.module.scss';

function LinkButoon(props) {
    return (
        <Link className={[styles.button, props.styles].join(' ')} to={props.path}>{props.children}</Link>
    );
}

export default LinkButoon;