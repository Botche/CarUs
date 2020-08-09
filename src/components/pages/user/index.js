import React, { useEffect } from 'react';

import styles from './index.module.scss';
import Register from './register';
import Login from './login';
import Layout from '../../layout';

function User(props) {
  useEffect(() => {
    const registerButton = document.getElementById('signUp');
    const loginButton = document.getElementById('signIn');
    const container = document.getElementById('container');

    const openRegister = () => {
      container.classList.add(styles["right-panel-active"]);
    };

    const openLogin = () => {
      container.classList.remove(styles["right-panel-active"]);
    };

    registerButton.addEventListener('click', openRegister);
    loginButton.addEventListener('click', openLogin);

    return () => {
      loginButton.removeEventListener('click', openLogin);
      registerButton.removeEventListener('click', openRegister);
    }
  }, []);

  return (
      <Layout>
        <div className={styles.container} id="container">
            
          <Login  
            styleForm={styles.form}
            styleFormContainer={styles['form-container']} 
            styleSignInContainer={styles['sign-in-container']} 
            styleFormContainerHeading={styles['form-container__heading']} 
            styleFormContainerInput={styles['form-container__input']} 
            styleFormContainerButton={styles['form-container__button']} 
          />
        
      
          <Register 
            styleForm={styles.form}
            styleFormContainer={styles['form-container']} 
            styleSignUpContainer={styles['sign-up-container']} 
            styleFormContainerHeading={styles['form-container__heading']} 
            styleFormContainerInput={styles['form-container__input']} 
            styleFormContainerButton={styles['form-container__button']} 
          />
          
          <div className={styles['overlay-container']}>
            <div className={styles.overlay}>
              <div className={[styles['overlay-panel'], styles['overlay-right']].join(' ')}>
                <h1 className={styles['form-container__heading']}>Hello, Friend!</h1>
                <p className={styles['form-container__paragraph']}>Enter your personal details and start journey with us</p>
                <button className={[styles.ghost, styles['form-container__button']].join(' ')} id="signUp">Sign Up</button>
              </div>
              <div className={[styles['overlay-panel'], styles['overlay-left']].join(' ')}>
                <h1 className={styles['form-container__heading']}>Welcome Back!</h1>
                <p className={styles['form-container__paragraph']}>To keep connected with us please login with your personal info</p>
                <button className={[styles.ghost, styles['form-container__button']].join(' ')} id="signIn">Sign In</button>
              </div>
            </div>
          </div>
        </div>
      </Layout>
  );
}

export default User;
