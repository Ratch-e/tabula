import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux'
import Routes from './js/routes'
import './css/index.css';
import configureStore from './js/store/configureStore';

const store = configureStore();

ReactDOM.render(
  <Provider store={store}>
    <Routes/>
  </Provider>,
  document.getElementById('root')
);
