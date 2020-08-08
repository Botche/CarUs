import React, { useContext } from 'react';
import { BrowserRouter } from 'react-router-dom';
import { Route, Switch, Redirect } from 'react-router';

import User from '../pages/user';
import ErrorPage from '../pages/errorPage';
import Home from '../pages/home';
import LogOut from '../pages/user/logout';
import UserContext from '../../Context';
import CreateCar from '../pages/addCar';

import '../../assets/styles/main.scss';

function Application(props) {
  const context = useContext(UserContext);
  const isLoggedIn = context.user.loggedIn;
  
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/" exact component={Home} />
        <Route path="/car"> 
          { isLoggedIn === true
              ? (<CreateCar /> )
              : (<Redirect to="/" />)
          }
        </Route>
        <Route path="/user/logout">
          { isLoggedIn === true
              ? (<LogOut /> )
              : (<Redirect to="/" />)
          }
        </Route>
        <Route path="/user">
          { isLoggedIn === true
              ? (<Redirect to="/" />)
              : (<User />)
          }
        </Route>
        <Route component={ErrorPage} />
      </Switch>
    </BrowserRouter>
  );
}

export default Application;
