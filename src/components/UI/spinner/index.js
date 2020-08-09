import React from 'react';

import styles from './index.module.scss';

function Spinner(props) {
    return (
        <div className={styles['spinner-container']}>
            <div className={styles['spinner-content']}>
                <div className={styles['lds-roller']}>
                    <div></div>
                    <div></div>
                    <div></div>
                    <div></div>
                    <div></div>
                    <div></div>
                    <div></div>
                    <div></div>
                </div>
                <p className={styles.text}>
                    Loading...
            </p>
            </div>
        </div>
    );
}

export default Spinner;