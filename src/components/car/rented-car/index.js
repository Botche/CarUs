import React from 'react';

import Button from '../../UI/link-button';

import styles from './index.module.scss';

function RentedCarCard(props) {

    return (
        <div className={styles.card}>
            <div className={styles.card__media}>
                <img src={props.imageUrl} alt={props.brand} />
            </div>

            <div className={styles.card__content}>
                <div className={styles.card__links}>
                    <Button styles={[styles['card__link'], styles['card__link--red']].join(' ')} path={`/car/unrent/${props.id}`}>
                        Unrent
                    </Button>
                </div>
            </div>
        </div>
    );
}

export default RentedCarCard;