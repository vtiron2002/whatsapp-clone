import React, { useState } from 'react';
import './App.scss';

import Sidebar from './components/Sidebar/Sidebar';
import Chat from './components/Chat/Chat';

import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Login from './components/Login/Login';
import { useStateValue } from './StateProvider';

export default () => {
  const [{ user }, dispatch] = useStateValue();

  return (
    <Router>
      <div className='app'>
        {!user ? (
          <Login />
        ) : (
          <div className='app__body'>
            <Sidebar />
            <Switch>
              <Route path='/room/:roomId'>
                <Chat />
              </Route>
            </Switch>
          </div>
        )}
      </div>
    </Router>
  );
};
