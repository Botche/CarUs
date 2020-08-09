import React, { useContext, useEffect, useState } from 'react';

import styles from './index.module.scss';
import CarCard from '../car-card';
import requester from '../../../services/firebase/requester';
import UserContext from '../../../Context';
import Spinner from '../../UI/spinner';

function CarList(props) {
    const context = useContext(UserContext);
    const [spinner, setSpinner] = useState(true);
    const [cars, setCars] = useState([]);

    useEffect(() => {
        const { token } = context.user;
        const url = token ? `cars.json?auth=${token}` : 'cars.json';
        requester
        .getItem(url)
        .then(response => {
            const carsFromDb = [];

            for (const key in response) {
                carsFromDb.push({
                    id: key,
                    ...response[key]
                });
            }
            
            setCars(carsFromDb);
            setSpinner(false);
        });
    }, [ setCars, setSpinner, context ]);
    
    let html = (<Spinner />);

    if (spinner === false) {
        html = (
            <div className={styles.carList}>
                {
                    cars.map(car =>
                        (<CarCard key={car.id} {...car} />))
                }
            </div>
        );
    }

    return (
        <div className={styles['spinner-home']}>
            {html}
        </div>
    );
}

export default CarList;