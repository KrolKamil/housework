import React from 'react';
import Login from './login/login';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { connect } from 'react-redux';

const App = () => {
  return (
    <div style={{ backgroundColor: '#d3d3d3', height: '100vh' }}>
      <Router>
        <Switch>
          <Route path='/'>
            <Login />
          </Route>
        </Switch>
      </Router>
    </div>
  );
};

export default connect(
  null,
  null
)(App);
