import React, { useContext, useState, useEffect, Fragment } from 'react';
import { useParams } from 'react-router-dom';

import Layout from '../../layout';
import UserContext from '../../../Context';
import Spinner from '../../UI/spinner';
import requester from '../../../services/firebase/requester';
import Button from '../../UI/link-button';

import styles from './index.module.scss';

function Details(props) {
    const context = useContext(UserContext);
    const [spinner, setSpinner] = useState(true);

    const [town, setTown] = useState('');
    const [brand, setBrand] = useState('');
    const [model, setModel] = useState('');
    const [price, setPrice] = useState(0);
    const [year, setYear] = useState(0);
    const [kilometers, setKilometers] = useState(0);
    const [power, setPower] = useState(0);
    const [seats, setSeats] = useState(0);
    const [color, setColor] = useState('');
    const [transmition, setTransmition] = useState('');
    const [fuel, setFuel] = useState('');
    const [description, setDescription] = useState('');
    const [imageUrl, setImageUrl] = useState('');
    const [isAuthor, setIsAuthor] = useState(false);

    const { id } = useParams();
    const { token } = context.user;

    useEffect(() => {
        const url = token ? `cars/${id}.json?auth=${token}` : `cars/${id}.json`;

        requester.getItem(url)
            .then(response => {
                setTown(response.town);
                setBrand(response.brand);
                setModel(response.model);
                setPrice(response.price);
                setYear(response.year);
                setKilometers(response.kilometers);
                setPower(response.power);
                setSeats(response.seats);
                setColor(response.color);
                setTransmition(response.transmition);
                setFuel(response.fuel);
                setDescription(response.description);
                setImageUrl(response.imageUrl);

                setSpinner(false);

                if(response.uid === context.user.uid) {
                    setIsAuthor(true); 
                }
            });
    }, [
        setTown,
        setBrand,
        setModel,
        setPrice,
        setYear,
        setKilometers,
        setPower,
        setSeats,
        setColor,
        setTransmition,
        setFuel,
        setDescription,
        setImageUrl,
        setSpinner,
        id,
        token,
        setIsAuthor,
        context.user.uid
    ]);

    let html = (<Spinner />);

    if (spinner === false) {
        let button = null;
        if (isAuthor === false) {
            button = (
                <Fragment>
                    <Button styles={[styles['container__button'], styles['container__button--blue']].join(' ')} 
                        path={`/car/rent/${id}`}>
                        Rent Now
                    </Button>
                </Fragment>
            );
        }
        const priceWithCurrency = price
            ? `$${price}`
            : 'No information';
        html = (
            <div className={styles.container}>
                <img className={styles['container__media']} src={imageUrl} alt={brand} />

                <div>
                    <p className={styles['container__paragraph']}><span className={styles['container__text--bold']}>Brand:</span> {brand || 'No information'}</p>
                    <p className={styles['container__paragraph']}><span className={styles['container__text--bold']}>Model:</span> {model || 'No information'}</p>
                    <p className={styles['container__paragraph']}><span className={styles['container__text--bold']}>Town:</span> {town || 'No information'}</p>
                    <p className={styles['container__paragraph']}><span className={styles['container__text--bold']}>Price per day:</span> {priceWithCurrency}</p>
                    <p className={styles['container__paragraph']}><span className={styles['container__text--bold']}>Year:</span> {year || 'No information'}</p>
                    <p className={styles['container__paragraph']}><span className={styles['container__text--bold']}>Kilometers:</span> {kilometers || 'No information'}</p>
                    <p className={styles['container__paragraph']}><span className={styles['container__text--bold']}>Horse power:</span> {power || 'No information'}</p>
                    <p className={styles['container__paragraph']}><span className={styles['container__text--bold']}>Seats:</span> {seats || 'No information'}</p>
                    <p className={styles['container__paragraph']}><span className={styles['container__text--bold']}>Color:</span> {color || 'No information'}</p>
                    <p className={styles['container__paragraph']}><span className={styles['container__text--bold']}>Transmition:</span> {transmition || 'No information'}</p>
                    <p className={styles['container__paragraph']}><span className={styles['container__text--bold']}>Type fuel:</span> {fuel || 'No information'}</p>
                    <p className={styles['container__paragraph']}><span className={styles['container__text--bold']}>Description:</span> {description || 'No information'}</p>
                </div>

                {button}
            </div>
        );
    }

    return (
        <Layout>
            {html}
        </Layout>
    );
}

export default Details;