import React, { useState, useContext, useEffect } from 'react';

import UserContext from '../../../Context';
import Input from '../../UI/input-field';
import Layout from '../../layout';
import Button from '../../UI/button';
import requester from '../../../services/firebase/requester';
import { useHistory, useParams } from 'react-router-dom';
import Spinner from '../../UI/spinner';
import AccessDenied from '../../UI/access-denied';

import styles from './index.module.scss';

function DeleteCar(props) {
    const context = useContext(UserContext);
    const history = useHistory();
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

    const { id } = useParams();
    const { uid, email, token } = context.user;

    useEffect(() => {
        requester.getItem(`cars/${id}.json?auth=${token}`)
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
        token
    ]);

    if(!props.uid || props.uid !== context.user.id) {
       return ( <AccessDenied />) 
    }

    const onSubmitHandler = async (event) => {
        event.preventDefault();
        try {
            await requester.deleteItem(`cars/${id}.json?auth=${token}`);

            history.push('/');
        } catch (error) {
            console.log(error);
        }
    };

    let html = (<Spinner />);

    if (spinner === false) {
        html = (
            <div className={styles['form-container']}>
                <form onSubmit={event => onSubmitHandler(event)}>
                    <Input disabled={true} styleClass={styles['form__input']} label="Town" id="town" value={town} onChangeHandler={(event) => setTown(event.target.value)} />
                    <Input disabled={true} styleClass={styles['form__input']} label="Brand" id="brand" value={brand} onChangeHandler={(event) => setBrand(event.target.value)} />
                    <Input disabled={true} styleClass={styles['form__input']} label="Model" id="model" value={model} onChangeHandler={(event) => setModel(event.target.value)} />
                    <Input disabled={true} styleClass={styles['form__input']} label="ImageUrl" id="imageUrl" value={imageUrl} onChangeHandler={(event) => setImageUrl(event.target.value)} type={'url'} />
                    <Input disabled={true} styleClass={styles['form__input']} label="Price per kilometer" id="price" value={price} onChangeHandler={(event) => setPrice(event.target.value)} type={'number'} />
                    <Input disabled={true} styleClass={styles['form__input']} label="Year of production" id="year" value={year} onChangeHandler={(event) => setYear(event.target.value)} type={'number'} />
                    <Input disabled={true} styleClass={styles['form__input']} label="Kilometers travelled" id="kilometers" value={kilometers} onChangeHandler={(event) => setKilometers(event.target.value)} type={'number'} />
                    <Input disabled={true} styleClass={styles['form__input']} label="Horse power" id="power" value={power} onChangeHandler={(event) => setPower(event.target.value)} type={'number'} />
                    <Input disabled={true} styleClass={styles['form__input']} label="Seats" id="seats" value={seats} onChangeHandler={(event) => setSeats(event.target.value)} type={'number'} />
                    <Input disabled={true} styleClass={styles['form__input']} label="Color" id="color" value={color} onChangeHandler={(event) => setColor(event.target.value)} />
                    <Input disabled={true} styleClass={styles['form__input']} label="Transmition" id="transmition" value={transmition} onChangeHandler={(event) => setTransmition(event.target.value)} />
                    <Input disabled={true} styleClass={styles['form__input']} label="Fuel" id="fuel" value={fuel} onChangeHandler={(event) => setFuel(event.target.value)} />
                    <Input disabled={true} styleClass={styles['form__input']} label="Description" id="description" value={description} onChangeHandler={(event) => setDescription(event.target.value)} />

                    <Button text={'Remove from catalog'} styleClass={styles['form__button']} />
                </form>
            </div>
        );
    }

    return (
        <Layout>
            {html}
        </Layout>
    );

};

export default DeleteCar;