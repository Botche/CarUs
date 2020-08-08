import React, { useState, useEffect } from 'react'
import UserContext from './Context';
import userFunctions from './services/user';

const Context = (props) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const logIn = (user) => {
    setUser({
      ...user,
      loggedIn: true
    });
  };

  const logOut = () => {
    setUser({
      loggedIn: false
    });
  };


  useEffect(() => {
    if(userFunctions.isLoggedIn() === true) {
      const user = userFunctions.getEmailAndIdFromCookie();
  
      logIn({
        email: user.email,
        id: user.uid  
      })
    } else{
      logOut();
    }

    setLoading(false)
  }, [])


  if (loading) {
    return (
      <div>Loading....</div>
    )
  }

  return (
    <UserContext.Provider value={{
      user,
      logIn,
      logOut
    }}>
      {props.children}
    </UserContext.Provider>
  );
}

export default Context;