import React, { useContext } from 'react';
import { useParams, useHistory }  from 'react-router-dom';

import requester from '../../services/firebase/requester';
import UserContext from '../../Context';
import Layout from '../layout';
import Spinner from '../UI/spinner';

function Unrent(props) {
    const context = useContext(UserContext);
    const history = useHistory();

    const { id } = useParams();
    const { token } = context.user;
    requester.updateItem(`cars/${id}.json?auth=${token}`, {
        isRented: false,
        rentedToDate: '',
        renterId: ''
    })
        .then(response => {
            return history.push('/');
        });
    return (
        <Layout>
            <Spinner />
        </Layout>
    )
}

export default Unrent;