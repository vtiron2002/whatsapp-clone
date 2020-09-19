import React from 'react';
import './Login.scss';
import { auth, provider } from '../../firebase';

import { Button } from '@material-ui/core';
import { useStateValue } from '../../StateProvider';

import { actionTypes } from '../../reducer';

import { useHistory } from 'react-router-dom';

const Login = () => {
  const [{ user }, dispatch] = useStateValue();
  const history = useHistory()

  history.push('/')

  const signIn = () => {
    auth
      .signInWithPopup(provider)
      .then((res) => {
        dispatch({ type: actionTypes.SET_USER, user: res.user });
      })
      .catch((e) => console.log(e.message));
  };

  return (
    <div className='login'>
      <div className='login__container'>
        <img
          src='https://upload.wikimedia.org/wikipedia/commons/thumb/6/6b/WhatsApp.svg/300px-WhatsApp.svg.png'
          alt=''
        />
        <div className='login__text'>
          <h1>Sign in to WhatsApp</h1>
        </div>

        <Button onClick={signIn}>Sign In With Google</Button>
      </div>
    </div>
  );
};

export default Login;
