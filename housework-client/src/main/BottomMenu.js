import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';
import Button from '@material-ui/core/Button';
import { setNewTaskOpen } from '../store/app/actions';
import { logout } from '../store/user/actions';
import socket from '../socket/Socket';

const Container = styled.div`
    position: absolute;
    bottom: 0px;
    left: 50%;
`;

const BottomMenu = (props) => {
  const { setNewTaskOpen, logout } = props;

  const logoutAction = () => {
    socket.stop();
    logout();
  };

  return (
    <Container>
      <Button onClick={() => { setNewTaskOpen(true); }} variant='contained' color='primary'>Dodaj Zadanie</Button>
      <Button onClick={() => { logoutAction(); }} variant='contained' color='primary'>Wyloguj</Button>
    </Container>
  );
};

const mapStoreStateToProps = ({ user }) => {
  return {
    ...user
  };
};

export default connect(
  mapStoreStateToProps,
  { setNewTaskOpen,
    logout }
)(BottomMenu);
