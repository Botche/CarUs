import React from 'react';

import Layout from '../../layout';
import CarList from '../../car/car-list';

import styles from './index.module.scss';

function Home(props) {
  return (
    <Layout>
      <h1 className={styles.header__title}>CarUs catalog</h1>

      <CarList />
    </Layout>
  );
}

export default Home;
