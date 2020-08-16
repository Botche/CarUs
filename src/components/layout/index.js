import React, { Fragment } from 'react';
import Header from '../header';
import Footer from '../footer';

import styles from './index.module.scss';

function Layout(props) {

  return (
    <Fragment>
        <Header />

        <main className={styles.main}>
          {props.children}
        </main>

        <Footer />
    </Fragment>
  );
}

export default Layout;
