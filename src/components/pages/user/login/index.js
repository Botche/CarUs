import React, { useState, useContext } from 'react';
import { useHistory } from 'react-router-dom';

import userFunction from '../../../../services/user';
import UserContext from '../../../../Context';

function Login(props) {
  const context = useContext(UserContext);
  const [ email, setEmail ] = useState('');
  const [ password, setPassword ] = useState('');
  const [ error, setError ] = useState(null);

  const history = useHistory();

  const onSubmitHandler = async (event) => {
    event.preventDefault();
    const email = event.target.email.value;
    const password = event.target.password.value;

    await userFunction.login(email, password);
    
    const user = userFunction.getEmailAndIdFromCookie();
    context.logIn(user);

    history.push('/');
  }

  const isInvalid =
      password === '' ||
      email === '';
  
  return (
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

        {error && <p>{error.message}</p>} 
      </form>
    </div>
  );
}

export default Login;