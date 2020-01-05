import React from 'react';
import { connect } from 'react-redux';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import { login } from '../store/user/actions';
import Container from '@material-ui/core/Container';

const Login = ({ login }) => {
  return (
    <Container maxWidth='sm'>
      <Grid container alignContent='center' justify='center' style={{ backgroundColor: '#f5f5f6', height: '100vh' }}>
        <Grid item xs={12} justify='center'>
          <div>Sign in</div>
        </Grid>
        <Grid item xs={12}>
          <TextField />
        </Grid>
        <div onClick={() => { login('bebok1', '123456'); }}>Hello World</div>
      </Grid>
    </Container>
  );
};

export default connect(
  null,
  { login }
)(Login);
