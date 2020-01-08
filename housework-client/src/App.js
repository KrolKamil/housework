import React from 'react';
import Login from './login/login';
import Register from './register/register';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { connect } from 'react-redux';
import Main from './main/main';

console.log('hi');

const App = (props) => {
  const { token } = props;
  return (
    <div style={{ backgroundColor: '#d3d3d3', height: '100vh' }}>
      <Router>
        <Switch>
          <Route exact path='/'>
            {console.log('a')}
            {token !== null ? <Main /> : <Login />}
          </Route>
          <Route exact path='/login'>
            {token !== null ? <Main /> : <Login />}
          </Route>
          <Route exact path='/register'>
            {token !== null ? <Main /> : <Register />}
          </Route>
          <Route exact path='/test'>
            {console.log('b')}
            <div>TEST</div>
          </Route>
        </Switch>
      </Router>
    </div>
  );
};

const mapStoreStateToProps = ({ user }) => {
  return {
    ...user
  };
};

export default connect(
  mapStoreStateToProps,
  null
)(App);
