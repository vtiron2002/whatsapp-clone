import React from 'react';
import { render } from 'react-dom';

import App from './App';
import { StateProvider } from './StateProvider';
import reducer, { initialState } from './reducer';

render(
  <StateProvider initialState={initialState} reducer={reducer}>
    <App />
  </StateProvider>,
  document.getElementById('root'),
);
