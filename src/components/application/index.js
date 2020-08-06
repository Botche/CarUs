import React, { useState, Fragment } from 'react';
import { BrowserRouter } from 'react-router-dom';
import { Route, Switch } from 'react-router';

import Login from '../user/login';
import Register from '../user/register';
import Logout from '../user/logout';
import Car from '../car';
import ErrorPage from '../errorPage';
import Home from '../home';

import '../../assets/styles/main.scss';

function Application(props) {
  const [ isloggedIn, setIsLoggedIn ] = useState(false);

  const routes = isloggedIn === false ?
  (
    <Fragment>
      <Route exact path="/user/register" component={Register} />
      <Route exact path="/user/logout" component={Logout} />
      <Route exact path="/user/login" component={Login} />
    </Fragment>
  )
  :
  (
    <Route exact path="/car/all" component={Car} />
  );


  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/" component={Home} />
        {routes}
        <Route component={ErrorPage} />
      </Switch>
    </BrowserRouter>
  );
}

export default Application;
