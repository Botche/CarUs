import React, { Fragment } from 'react';

import Header from '../header';

// import styles from './index.module.scss';

function Layout(props) {

  return (
    <Fragment>
      <Header />

      <main>
        {props.children}
      </main>

      <footer>
        
      </footer>
    </Fragment>
  );
}

export default Layout;
