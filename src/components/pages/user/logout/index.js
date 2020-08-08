import React, { useContext, useEffect } from 'react';

import { Redirect } from 'react-router-dom';

import userFunction from '../../../../services/user';
import UserContext from '../../../../Context';

function Logout(props) {
  const context = useContext(UserContext);

  useEffect(() => {
    userFunction.logout()
      .then(() => {
        context.logOut();
      });
  }) 
  
  return <Redirect to="/" />
}

export default Logout;