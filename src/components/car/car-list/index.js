import React from 'react';

import styles from './index.module.scss';
import CarCard from '../car-card';

function CarList(props) {

    const cars = props.cars.map(car => {
        return (
            <CarCard key={car._id} {...car} />
        );
    });

    return (
        <div className={styles.carList}>
            {cars}
        </div>
    );
}

export default CarList;