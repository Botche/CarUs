import React, { useState, useContext, Fragment } from 'react';
import { Redirect } from 'react-router-dom';
import { useToasts } from 'react-toast-notifications';

import userFunction from '../../../../services/user';
import UserContext from '../../../../Context';

function Login(props) {
  const context = useContext(UserContext);
  const [ email, setEmail ] = useState('');
  const [ password, setPassword ] = useState('');
  const { addToast } = useToasts();

  const onSubmitHandler = async (event) => {
    event.preventDefault();
    const email = event.target.email.value;
    const password = event.target.password.value;

    try {
      await userFunction.login(email, password);
    
      const user = userFunction.getAllFromCookie();
      context.logIn(user); 

      return ( <Redirect to="/" /> );
    } catch (error) {
      addToast(error.message, { appearance: 'error' });
    }
  }

  const isInvalid =
      password === '' ||
      email === '';
  
  return (
    <Fragment>
      <div className={[props.styleFormContainer, props.styleSignInContainer].join(' ')}>
        <form className={props.styleForm} onSubmit={event => onSubmitHandler(event)}>
          <h1 className={props.styleFormContainerHeading}>Log in</h1>
          
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
          <button disabled={isInvalid} className={props.styleFormContainerButton}>Log In</button>
        </form>
      </div>
    </Fragment>
  );
}

export default Login;