import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import { login } from '../store/user/actions';
import CssBaseline from '@material-ui/core/CssBaseline';
import styled from 'styled-components';
import Button from '@material-ui/core/Button';

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  background-color: white;
  padding: 25px;
`;

// token: null,
//   error: null,
//   isLogging: false,
//   isRegistering: false

const Login = (props) => {
  const { login, token, loginError } = props;
  const [userName, setUserName] = useState('');
  const [password, setPassword] = useState('');

  const tryToLogin = () => {
    // login('bebok1', '123456');
    login(userName, password);
  };

  useEffect(() => {
    token != null ? console.log('logged') : console.log('unlogged');
  }, [token]);

  const displayError = () => {
    return (loginError !== null);
  };

  return (
    <Grid
      container
      spacing={0}
      direction='column'
      alignItems='center'
      justify='center'
      style={{ minHeight: '100vh' }}
    >
      <CssBaseline />
      <Wrapper>
        <h1 style={{ margin: '0px' }}>Sign in</h1>
        <TextField error={displayError()} onChange={(e) => { setUserName(e.target.value); }} label='Login' />
        <TextField error={displayError()} onChange={(e) => { setPassword(e.target.value); }} label='Password' type='password' />
        <Button onClick={tryToLogin} style={{ marginTop: '10px' }} variant='contained' color='primary'>Send</Button>
      </Wrapper>
    </Grid>
  );
};

const mapStoreStateToProps = ({ user }) => {
  return {
    ...user
  };
};

export default connect(
  mapStoreStateToProps,
  { login }
)(Login);
