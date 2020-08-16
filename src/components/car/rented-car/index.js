import React from 'react';

import Button from '../../UI/link-button';

import styles from './index.module.scss';

function RentedCarCard(props) {
    const determinateLeftTime = () => {
        const timestamp = Date.parse(props.rentedToDate);
        const diff = timestamp - Date.now();
        const formated = new Date(diff).toTimeString().slice(3, 9);

        return `${formated} minutes`;
    };

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

                    <p className={styles.card__leftMinutes}>{determinateLeftTime()}</p>
                </div>
            </div>
        </div>
    );
}

export default RentedCarCard;