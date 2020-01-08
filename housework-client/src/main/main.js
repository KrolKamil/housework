import React from 'react';
import { connect } from 'react-redux';
import Socket from '../socket/Socket';

const Main = () => {
  const socket = new Socket();
  socket.start();
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
