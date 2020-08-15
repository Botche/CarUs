import React, { useContext } from 'react';
import { BrowserRouter } from 'react-router-dom';
import { Route, Switch, Redirect } from 'react-router';

import User from '../pages/user';
import ErrorPage from '../pages/errorPage';
import Home from '../pages/home';
import LogOut from '../pages/user/logout';
import UserContext from '../../Context';
import CreateCar from '../pages/addCar';
import EditCar from '../pages/editCar';

import '../../assets/styles/main.scss';
import DeleteCar from '../pages/deleteCar';
import Details from '../pages/detailsCar';

function Application(props) {
  const context = useContext(UserContext);
  const isLoggedIn = context.user.loggedIn;
  
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/" exact component={Home} />
        <Route path="/car/add"> 
          { isLoggedIn === true
              ? (<CreateCar /> )
              : (<Redirect to="/" />)
          }
        </Route>
        <Route path="/car/edit/:id">
          { isLoggedIn === true
              ? (<EditCar />)
              : (<Redirect to="/" />)
          }
        </Route>
        <Route path="/car/details/:id" component={Details} />
        <Route path="/car/delete/:id">
          { isLoggedIn === true
              ? (<DeleteCar />)
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
