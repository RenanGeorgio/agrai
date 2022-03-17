import 'typeface-roboto';
import React from 'react';
import ReactDOM from 'react-dom';
import { HashRouter } from 'react-router-dom';
import { Provider } from 'react-redux';

import * as serviceWorker from './serviceWorker';
import reportWebVitals from './reportWebVitals';

import App from './App';
import store from './store';

import dotenv from 'dotenv';
dotenv.config({path: "../local.env"}); 

ReactDOM.render((
 
  <Provider store={store}>
    <HashRouter>
      <App />
    </HashRouter>
  </Provider>
  
), document.getElementById('root'));

serviceWorker.register();

reportWebVitals();