import React, { useContext, useState, useEffect } from 'react';
import { useParams, Redirect, useHistory } from 'react-router-dom';

import moment from 'moment';

import Layout from '../../layout';
import Spinner from '../../UI/spinner';
import requester from '../../../services/firebase/requester';
import UserContext from '../../../Context';
import Button from '../../UI/button';
import Input from '../../UI/input-field';

import styles from './index.module.scss';

function RentCar(props) {
    const history = useHistory();
    const context = useContext(UserContext);
    const [spinner, setSpinner] = useState(true);

    const [brand, setBrand] = useState('');
    const [model, setModel] = useState('');
    const [price, setPrice] = useState(0);
    const [time, setTime] = useState(0);
    const [imageUrl, setImageUrl] = useState('');

    const { id } = useParams();
    const { uid, email, token } = context.user;

    useEffect(() => {
        const url = token ? `cars/${id}.json?auth=${token}` : `cars/${id}.json`;

        requester.getItem(url)
            .then(response => {
                setBrand(response.brand);
                setModel(response.model);
                setPrice(response.price);
                setImageUrl(response.imageUrl);

                setSpinner(false);
            });
    }, [
        setBrand,
        setModel,
        setPrice,
        setImageUrl,
        setSpinner,
        id,
        token
    ]);

    const onSubmitHandler = (event) => {
        event.preventDefault();
        if (uid) {
            const date = moment().add(event.target.time.value, 'minutes').format('LLLL');
            const url = token ? `cars/${id}.json?auth=${token}` : `cars/${id}.json`;

            requester.updateItem(url, {
                isRented: true,
                rentedToDate: date,
                renterId: uid
            })
                .then(response => {
                    history.push('/');
                });
        } else {
            history.push('/user');
        }
    };

    let html = (<Spinner />);

    if (spinner === false) {
        html = (
            <div className={styles.container}>
                <div className={styles['container__media']}><img src={imageUrl} alt={brand} /></div>
                <div className={styles['container__content']}>
                    <p>Car: {brand} - {model}</p>
                </div>
                <form onSubmit={onSubmitHandler} className={styles['container__form']}>
                    <Input styleClass={styles['container__form-input']} label="Time in minutes" id="time" value={time}  onChangeHandler={(event) => setTime(event.target.value)} type='number' />
                    
                    <Button text={'Rent the car'} styleClass={styles['container__form-button'] } />
                </form>
            </div>
        );
    }

    return (
        <Layout>
            {html}
        </Layout>
    );
}

export default RentCar;