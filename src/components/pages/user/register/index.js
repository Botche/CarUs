import React, { useState, useContext } from 'react';

import userFunction from '../../../../services/user';
import UserContext from '../../../../Context';
import { useHistory } from 'react-router-dom';

function Register(props) {
  const context = useContext(UserContext);
  const history = useHistory();
  const [ username, setUsername ] = useState('');
  const [ email, setEmail ] = useState('');
  const [ password, setPassword ] = useState('');
  const [ repeatPassword, setRepeatPassword ] = useState('');
  const [ error, setError ] = useState(null);

  const onSubmitHandler = async (event) => {
    event.preventDefault();

    const email = event.target.email.value;
    const password = event.target.password.value;

    await userFunction.register(email, password);

    const user = userFunction.getEmailAndIdFromCookie();
    context.logIn(user);

    history.push('/');
  }

  const isInvalid =
      password !== repeatPassword ||
      password === '' ||
      email === '' ||
      username === '';

    return ( 
      <div className={[props.styleFormContainer, props.styleSignUpContainer].join(' ')}>
        <form className={props.styleForm} onSubmit={event => onSubmitHandler(event)}>
          <h1 className={props.styleFormContainerHeading}>Register</h1>
          
          <input 
            className={props.styleFormContainerInput} 
            type="text" 
            placeholder="Name" 
            name="name"
            value={username}
            onChange={event => setUsername(event.target.value)}
          />
          <input 
            className={props.styleFormContainerInput} 
            type="email" 
            placeholder="Email" 
            name="email"
            value={email}
            onChange={event => setEmail(event.target.value)}
          />
          <input 
            className={props.styleFormContainerInput} 
            type="password" 
            placeholder="Password"
            name="password"
            value={password} 
            onChange={event => setPassword(event.target.value)}
          />
          <input 
            className={props.styleFormContainerInput} 
            type="password" 
            placeholder="RepeatPassword" 
            name="repeatPassword"
            value={repeatPassword}
            onChange={event => setRepeatPassword(event.target.value)}
          />

          <button disabled={isInvalid} className={props.styleFormContainerButton}>Register</button>

          {error && <p>{error.message}</p>} 
        </form>
      </div>
    );
}

export default Register;