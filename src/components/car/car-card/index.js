import React, { useContext, Fragment, useState, useEffect } from 'react';

import Button from '../../UI/link-button';
import UserContext from '../../../Context';

import styles from './index.module.scss';

function CarCard(props) {
    const context = useContext(UserContext);
    const [isAuthor, setIsAuthor] = useState(false);

    const shortDescription = props.description.length >= 100
        ? props.description.slice(0, 75) + '...'
        : props.description;

    const defaultButton = (
        <Fragment>
            <Button styles={[styles['card__link'], styles['card__link--grey']].join(' ')} path={`/car/details/${props.id}`}>
                Details
            </Button>
        </Fragment>
    );

    const userButton = (
        <Fragment>
            <Button styles={[styles['card__link'], styles['card__link--blue']].join(' ')} path={`/car/rent/${props.id}`}>
                Rent Now
            </Button>
        </Fragment>
    );

    const ownerButtons = (
        <Fragment>
            <Button styles={[styles['card__link'], styles['card__link--red']].join(' ')} path={`/car/delete/${props.id}`}>
                Delete
            </Button>
            <Button styles={[styles['card__link'], styles['card__link--green']].join(' ')} path={`/car/edit/${props.id}`}>
                Edit
            </Button>
        </Fragment>
    );

    const carCardButtons = isAuthor === false 
        ? (
            <Fragment>
                {defaultButton}
                {userButton}
            </Fragment>
        )
        : ( 
            <Fragment>
                {ownerButtons}
                {defaultButton}
            </Fragment>
        );

    useEffect(() => {
        if (context.user.uid && props.uid === context.user.uid) {
            setIsAuthor(true);
        }
    }, [ setIsAuthor, context.user.uid, props.uid ]);

    return (
        <div className={styles.card}>
            <div className={styles.card__media}>
                <img src={props.imageUrl} alt={props.brand} />
            </div>

            <div className={styles.card__content}>
                <h2 className={styles.card__title}>{props.brand}</h2>
                <h3 className={styles.card__title}>{props.model}</h3>

                <p className={styles.card__description}>{shortDescription}</p>

                <div className={styles.card__links}>
                    {carCardButtons}
                </div>
            </div>
        </div>
    );
}

export default CarCard;