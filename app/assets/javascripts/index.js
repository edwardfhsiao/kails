import React from 'react';
import ReactDOM from 'react-dom';
import { createStore, applyMiddleware } from 'redux';
import thunkMiddleware from 'redux-thunk';
import { Provider } from 'react-redux';
import { reducer } from './components/Index/reducers/index';

import Index from './components/Index/index';
require('../stylesheets/index.scss');

const store = createStore(reducer, applyMiddleware(thunkMiddleware));


ReactDOM.render(
  <Provider store={store}>
    <Index/>
  </Provider>,
  document.getElementById('root')
);

