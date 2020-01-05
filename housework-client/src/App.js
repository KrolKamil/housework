import React from 'react';
import { connect } from 'react-redux';
import { login } from './store/user/actions';

const App = ({ login }) => {
  return (
    <div onClick={() => { login('bebok1', '123456'); }}>Hello World</div>
  );
};

export default connect(
  null,
  { login }
)(App);
