import React, { useContext, Fragment } from 'react';

import Button from '../../UI/link-button';
import UserContext from '../../../Context';

import styles from './index.module.scss';

function CarCard(props) {
    const context = useContext(UserContext);

    const isLoggedIn = context.user.loggedIn;

    const shortDescription = props.description.length >= 100 
        ? props.description.slice(0, 75) + '...'
        : props.description;

    const determinateIfOwner =  () => {
        if (isLoggedIn) {
            return (
                <Fragment>
                    <Button  styles={[styles['card__link'], styles['card__link--red']].join(' ')} path={`/car/delete/${props._id}`}> 
                        Delete
                    </Button>
                    <Button styles={[styles['card__link'], styles['card__link--green']].join(' ')} path={`/car/edit/${props._id}`}> 
                        Edit
                    </Button>
                </Fragment>
            )
        }

        return null;
    }

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
                    {determinateIfOwner()}
                    <Button  styles={[styles['card__link'], styles['card__link--grey']].join(' ')} path={`/car/details/${props._id}`}> 
                        Details
                    </Button>
                    <Button  styles={[styles['card__link'], styles['card__link--blue']].join(' ')} path={`/car/rent/${props._id}`}> 
                        Rent Now
                    </Button>
                </div>
            </div>
        </div>
    );
}

export default CarCard;