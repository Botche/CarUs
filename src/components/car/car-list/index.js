import React, { useContext, useEffect, useState } from 'react';

import moment from 'moment';

import CarCard from '../car-card';
import requester from '../../../services/firebase/requester';
import UserContext from '../../../Context';
import Spinner from '../../UI/spinner';

import styles from './index.module.scss';

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
                if(response[key].isRented === false) {
                    carsFromDb.push({
                        id: key,
                        ...response[key]
                    });
                } else {
                    if(moment().diff(response[key].rentedToDate) > 0) {
                        const url = token ? `cars/${key}.json?auth=${token}` : `cars/${key}.json`;

                        requester.updateItem(url, {
                            isRented: false,
                            rentedToDate: '',
                            renterId: ''
                        });
                        
                        carsFromDb.push({
                            id: key,
                            ...response[key]
                        });
                    }
                }
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
                    cars.length !== 0 
                        ? cars.map(car =>
                            (<CarCard key={car.id} {...car} />))
                        : <p>No free cars to rent</p>
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