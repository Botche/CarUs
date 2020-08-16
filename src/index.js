import React, { Fragment } from 'react';
import ReactDOM from 'react-dom';
import { ToastProvider } from 'react-toast-notifications';

import Application from './components/application';
import Context from './UserContext';

ReactDOM.render(
  <React.StrictMode>
    <Fragment>
      <ToastProvider autoDismiss={true} autoDismissTimeout={2500} >
        <Context>
          <Application />
        </Context>
      </ToastProvider>
    </Fragment>
  </React.StrictMode>,
  document.getElementById('application')
);