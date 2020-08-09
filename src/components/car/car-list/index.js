import React, { useContext, useEffect, useState } from 'react';

import styles from './index.module.scss';
import CarCard from '../car-card';
import requester from '../../../services/firebase/requester';
import UserContext from '../../../Context';

function CarList(props) {
    const context = useContext(UserContext);
    const [spinner, setSpinner] = useState(true);
    const [cars, setCars] = useState([]);

    useEffect(() => {
        const { token } = context.user;

        requester
        .getItem(`cars.json?auth=${token}`)
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
    
    let html =  (<div>Loading...</div>);

    if (spinner === false) {
        html = cars.map(car =>
            (<CarCard key={car.id} {...car} />));
    }

    return (
        <div className={styles.carList}>
            {html}
        </div>
    );
}

export default CarList;