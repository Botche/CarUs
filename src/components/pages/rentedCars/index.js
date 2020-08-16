import React, { useContext, useState, useEffect, Fragment } from 'react';

import moment from 'moment';

import Layout from '../../layout';
import requester from '../../../services/firebase/requester';
import Spinner from '../../UI/spinner';
import UserContext from '../../../Context';

import styles from './index.module.scss';
import RentedCarCard from '../../car/rented-car';

function RentedCars(props) {

    const context = useContext(UserContext);
    const [spinner, setSpinner] = useState(true);
    const [cars, setCars] = useState([]);

    useEffect(() => {
        const { uid, token } = context.user;
        const url = token ? `cars.json?auth=${token}` : 'cars.json';
        requester
            .getItem(url)
            .then(response => {
                const carsFromDb = [];

                for (const key in response) {
                    if (response[key].renterId === uid && moment().diff(response[key].rentedToDate) < 0) {
                        carsFromDb.push({
                            id: key,
                            ...response[key]
                        });
                    }
                }

                setCars(carsFromDb);
                setSpinner(false);
            });
    }, [setCars, setSpinner, context]);

    let html = (<Spinner />);

    if (spinner === false) {
        html = (
            <Fragment>
                {
                    cars.map(car =>
                        (<RentedCarCard key={car.id} {...car} />))
                }
            </Fragment>
        );
    }

    return (
        <Layout>
            <div className={styles['container']}>
                {html}
            </div>
        </Layout>
    );
}

export default RentedCars;