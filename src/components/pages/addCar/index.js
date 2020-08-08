import React, { useState, useContext } from 'react';

import UserContext from '../../../Context';
import Input from '../../UI/input-field';
import Layout from '../../layout';
import Button from '../../UI/button';

import styles from './index.module.scss';

function CreateCar () {
    const context = useContext(UserContext);

    const [ town, setTown ] = useState('');
    const [ brand, setBrand ] = useState('');
    const [ model, setModel ] = useState('');
    const [ price, setPrice ] = useState(0);
    const [ year, setYear ] = useState(0);
    const [ kilometers, setKilometers ] = useState(0);
    const [ power, setPower ] = useState(0);
    const [ seats, setSeats ] = useState(0);
    const [ color, setColor ] = useState('');
    const [ transmition, setTransmition ] = useState('');
    const [ fuel, setFuel ] = useState('');

    const onSubmitHandler = (event) => {
        event.preventDefault();

        console.log('carrrr')
    };

    return (
        <Layout>
            <div className={styles['form-container']}>
                <form onSubmit={event => onSubmitHandler(event)}>
                    <Input styleClass={styles['form__input']} label="Town" id="town" value={town}  onChange={(event) => setTown(event.target.value)} />
                    <Input styleClass={styles['form__input']} label="Brand" id="brand" value={brand} onChange={(event) => setBrand(event.target.value)} />
                    <Input styleClass={styles['form__input']} label="Model" id="model" value={model} onChange={(event) => setModel(event.target.value)} />
                    <Input styleClass={styles['form__input']} label="Price per kilometer" id="price" value={price} onChange={(event) => setPrice(event.target.value)} type={'number'} />
                    <Input styleClass={styles['form__input']} label="Year of production" id="year" value={year} onChange={(event) => setYear(event.target.value)} type={'number'} />
                    <Input styleClass={styles['form__input']} label="Kilometers travelled" id="kilometers" value={kilometers} onChange={(event) => setKilometers(event.target.value)} type={'number'} />
                    <Input styleClass={styles['form__input']} label="Horse power" id="power" value={power} onChange={(event) => setPower(event.target.value)} type={'number'} />
                    <Input styleClass={styles['form__input']} label="Seats" id="seats" value={seats} onChange={(event) => setSeats(event.target.value)} type={'number'} />
                    <Input styleClass={styles['form__input']} label="Color" id="color" value={color} onChange={(event) => setColor(event.target.value)} />
                    <Input styleClass={styles['form__input']} label="Transmition" id="transmition" value={transmition} onChange={(event) => setTransmition(event.target.value)} />
                    <Input styleClass={styles['form__input']} label="Fuel" id="fuel" value={fuel} onChange={(event) => setFuel(event.target.value)} />

                    <Button text={'Add to our catalog'} styleClass={styles['form__button'] } />
                </form>
            </div>
        </Layout>
    );

};

export default CreateCar;