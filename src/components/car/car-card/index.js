import React from 'react';
import { Link } from 'react-router-dom';

import Button from '../../UI/link-button';

import styles from './index.module.scss';

function CarCard(props) {

    const shortDescription = props.description.length >= 100 
        ? props.description.slice(0, 75) + '...'
        : props.description;

    return (
        <div className={styles.card}>
            <div className={styles.card__media}>
                <img src={props.href} alt={props.name} />
            </div>

            <div className={styles.card__content}>
                <h2 className={styles.card__title}>{props.name}</h2>

                <p className={styles.card__description}>{shortDescription}</p>

                <div className={styles.card__links}>
                    <Button  styles={[styles['card__link'], styles['card__link--red']].join(' ')} path={`/car/delete/${props._id}`}> 
                        Delete
                    </Button>
                    <Button styles={[styles['card__link'], styles['card__link--green']].join(' ')} path={`/car/edit/${props._id}`}> 
                        Edit
                    </Button>
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