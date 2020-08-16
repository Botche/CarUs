import React, { useState, useContext } from 'react';
import { useToasts } from 'react-toast-notifications';

import UserContext from '../../../Context';
import Input from '../../UI/input-field';
import Layout from '../../layout';
import Button from '../../UI/button';
import requester from '../../../services/firebase/requester';

import styles from './index.module.scss';
import { useHistory } from 'react-router-dom';

function CreateCar (props) {
    const context = useContext(UserContext);
    const history = useHistory();

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
    const [ description, setDescription ] = useState('');
    const [ imageUrl, setImageUrl ] = useState('');
    const { addToast } = useToasts();

    const onSubmitHandler = async (event) => {
        event.preventDefault();

        const { uid, email, token } = context.user;

        try {
            if (!town || !brand || !model
                || price <= 0 || year < 1900 || kilometers < 0
                || power <= 0 || seats <= 0 || !color
                || !transmition || !fuel || !description) {
                throw Error('Some inputs are invalid ( empty or invalid values )');
            }

            await requester.createItem(`cars.json?auth=${token}`, {
                town,
                brand,
                model,
                price,
                year,
                kilometers,
                power,
                seats,
                color,
                transmition,
                fuel,
                uid,
                email,
                description,
                imageUrl,
                isRented: false,
                rentedToDate: '',
                renterId: ''
            });
    
            history.push('/');
        } catch(error) {
            addToast(error.message, { appearance: 'error' });
        }
    };

    return (
        <Layout>
            <div className={styles['form-container']}>
                <form onSubmit={event => onSubmitHandler(event)}>
                    <Input styleClass={styles['form__input']} label="Town" id="town" value={town}  onChangeHandler={(event) => setTown(event.target.value)} />
                    <Input styleClass={styles['form__input']} label="Brand" id="brand" value={brand} onChangeHandler={(event) => setBrand(event.target.value)} />
                    <Input styleClass={styles['form__input']} label="Model" id="model" value={model} onChangeHandler={(event) => setModel(event.target.value)} />
                    <Input styleClass={styles['form__input']} label="ImageUrl" id="imageUrl" value={imageUrl} onChangeHandler={(event) => setImageUrl(event.target.value)} type={'url'} />
                    <Input styleClass={styles['form__input']} label="Price per day" id="price" value={price} onChangeHandler={(event) => setPrice(event.target.value)} type={'number'} />
                    <Input styleClass={styles['form__input']} label="Year of production" id="year" value={year} onChangeHandler={(event) => setYear(event.target.value)} type={'number'} />
                    <Input styleClass={styles['form__input']} label="Kilometers travelled" id="kilometers" value={kilometers} onChangeHandler={(event) => setKilometers(event.target.value)} type={'number'} />
                    <Input styleClass={styles['form__input']} label="Horse power" id="power" value={power} onChangeHandler={(event) => setPower(event.target.value)} type={'number'} />
                    <Input styleClass={styles['form__input']} label="Seats" id="seats" value={seats} onChangeHandler={(event) => setSeats(event.target.value)} type={'number'} />
                    <Input styleClass={styles['form__input']} label="Color" id="color" value={color} onChangeHandler={(event) => setColor(event.target.value)} />
                    <Input styleClass={styles['form__input']} label="Transmition" id="transmition" value={transmition} onChangeHandler={(event) => setTransmition(event.target.value)} />
                    <Input styleClass={styles['form__input']} label="Type fuel" id="fuel" value={fuel} onChangeHandler={(event) => setFuel(event.target.value)} />
                    <Input styleClass={styles['form__input']} label="Description" id="description" value={description} onChangeHandler={(event) => setDescription(event.target.value)} />

                    <Button text={'Add to our catalog'} styleClass={styles['form__button'] } />
                </form>
            </div>
        </Layout>
    );

};

export default CreateCar;