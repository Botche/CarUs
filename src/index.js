import React, { Fragment } from 'react';
import ReactDOM from 'react-dom';

import Application from './components/application';
import Context from './UserContext';

ReactDOM.render(
  <React.StrictMode>
    <Fragment>
      <Context>
        <Application />
      </Context>
    </Fragment>
  </React.StrictMode>,
  document.getElementById('application')
);