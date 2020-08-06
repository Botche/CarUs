import React, { useState } from 'react';
import { BrowserRouter } from 'react-router-dom';
import { Route, Switch } from 'react-router';

import Login from '../user/login';

import '../../assets/styles/main.scss';

function Application(props) {
  const [ isloggedIn, setIsLoggedIn ] = useState(false); 

  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/" component={Login} />
        {/* <Route component={ErrorPage} /> */}
      </Switch>
    </BrowserRouter>
  );
}

export default Application;
