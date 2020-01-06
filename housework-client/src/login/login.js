import React from 'react';
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

const Login = ({ login }) => {
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
        <TextField label='Login' />
        <TextField label='Password' type='password' />
        <Button style={{ marginTop: '10px' }} onClick={() => { login('bebok1', '123456'); }} variant='contained' color='primary'>Send</Button>
      </Wrapper>
    </Grid>
  );
};

export default connect(
  null,
  { login }
)(Login);
