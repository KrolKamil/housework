import React from 'react';
import { connect } from 'react-redux';

const Main = () => {
  return (
    <div>Main</div>
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
)(Main);
