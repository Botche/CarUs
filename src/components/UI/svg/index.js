import React, { Fragment } from 'react';

import sprite from '../../../assets/images/svg-sprite/svg-sprite.svg';

import styles from './index.module.scss';

function svg(props) {
    return (
        <svg className={styles.svg}>
            <use href={sprite + '#icon-' + props.iconName}></use>
        </svg>
    );
}

export default svg;