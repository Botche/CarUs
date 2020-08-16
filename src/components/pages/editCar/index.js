import React, { useState, useContext, useEffect } from 'react';
import { useToasts } from 'react-toast-notifications';

import UserContext from '../../../Context';
import Input from '../../UI/input-field';
import Layout from '../../layout';
import Button from '../../UI/button';
import requester from '../../../services/firebase/requester';
import { useHistory, useParams } from 'react-router-dom';
import Spinner from '../../UI/spinner';
import AccessDenied from '../../UI/access-denied';

import styles from './index.module.scss';

function EditCar(props) {

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
    const [isAuthor, setIsAuthor] = useState(false);
    const [authorId, setAuthorId] = useState('');
    const { addToast } = useToasts();

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
                setAuthorId(response.uid);

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
        setAuthorId,
        context.user.uid
    ]);

    const onSubmitHandler = async (event) => {
        event.preventDefault();
        try {
            if (context.user.uid !== authorId) {
                throw new Error('You are not author :)');
            }

            if (!town || !brand || !model
                || price <= 0 || year < 1900 || kilometers < 0
                || power <= 0 || seats <= 0 || !color
                || !transmition || !fuel || !description) {
                throw Error('Some inputs are invalid ( empty or invalid values )');
            }

            await requester.updateItem(`cars/${id}.json?auth=${token}`, {
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
                imageUrl
            });

            history.push('/');
        } catch (error) {
            addToast(error.message, { appearance: 'error' });
        }
    };

    let html = (<Spinner />);

    if (spinner === false) {
        if (isAuthor === false) {
            html = ( <AccessDenied />);
        } else {
            html = (
                <div className={styles['form-container']}>
                    <form onSubmit={event => onSubmitHandler(event)}>
                        <Input styleClass={styles['form__input']} label="Town" id="town" value={town} onChangeHandler={(event) => setTown(event.target.value)} />
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
                        <Input styleClass={styles['form__input']} label="Fuel" id="fuel" value={fuel} onChangeHandler={(event) => setFuel(event.target.value)} />
                        <Input styleClass={styles['form__input']} label="Description" id="description" value={description} onChangeHandler={(event) => setDescription(event.target.value)} />
    
                        <Button text={`Edit car`} styleClass={styles['form__button']} />
                    </form>
                </div>
            );
        }
    } 

    return (
        <Layout>
            {html}
        </Layout>
    );

};

export default EditCar;