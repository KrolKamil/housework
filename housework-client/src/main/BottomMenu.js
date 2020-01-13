import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';
import Button from '@material-ui/core/Button';
import { setNewTaskOpen } from '../store/app/actions';

const Container = styled.div`
    position: absolute;
    bottom: 0px;
    left: 50%;
`;

const BottomMenu = (props) => {
  const { setNewTaskOpen } = props;

  return (
    <Container>
      <Button onClick={() => { setNewTaskOpen(true); }} variant='contained' color='primary'>Dodaj Zadanie</Button>
      <Button variant='contained' color='primary'>Informacje</Button>
      <Button variant='contained' color='primary'>Wyloguj</Button>
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
  { setNewTaskOpen }
)(BottomMenu);
