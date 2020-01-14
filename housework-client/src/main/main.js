import React from 'react';
import { connect } from 'react-redux';
import Grid from '@material-ui/core/Grid';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Paper from '@material-ui/core/Paper';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import ArrowForward from '@material-ui/icons/ArrowForward';
import ArrowBack from '@material-ui/icons/ArrowBack';
import socket from '../socket/Socket';
import ListSubheader from '@material-ui/core/ListSubheader';
import NewTask from './NewTask';
import EditTask from './EditTask';
import BottomMenu from './BottomMenu';
import { setEditVisibility, setToEdit } from '../store/tasks/actions';

const listHeaderStles = {
  backgroundColor: '#b6b7e2'
};

const getLiBgColorByOwned = (owned) => {
  if (owned) {
    return '#1edb27';
  }
  return '#e34343';
};

const Main = (props) => {
  const { user, tasks, setEditVisibility, setToEdit } = props;

  const showEditTaskByID = (id) => {
    setToEdit(id);
    setEditVisibility(true);
  };

  const toDoList = () => (
    <Paper style={{ marginRight: '15px', height: '80vh', overflow: 'auto' }}>
      <List
        subheader={
          <ListSubheader style={listHeaderStles} component='div' id='nested-list-subheader'>
            Do zrobienia
          </ListSubheader>
        }
        dense
        component='div'
        role='list'>
        {tasks.tasks.map(task => {
          if (task.position === 'TODO') {
            const labelId = `transfer-list-item-${task.id}-label`;
            return (
              <ListItem onClick={() => { showEditTaskByID(task.id); }} key={task.id} role='listitem' button >
                <ListItemText id={labelId} primary={task.title} />
                <ListItemSecondaryAction>
                  <IconButton onClick={() => { socket.task.requestMoveTask(task.id, 'INPROGRESS'); }} edge='end' aria-label='comments'>
                    <ArrowForward />
                  </IconButton>
                </ListItemSecondaryAction>
              </ListItem>
            );
          }
        })}
        <ListItem />
      </List>
    </Paper>
  );

  const inProgressList = () => (
    <Paper style={{ marginRight: '15px', height: '80vh', overflow: 'auto' }}>
      <List
        subheader={
          <ListSubheader style={listHeaderStles} component='div' id='nested-list-subheader'>
            W trakcie
          </ListSubheader>
        }
        dense
        component='div'
        role='list'>
        {tasks.tasks.map(task => {
          if (task.position === 'INPROGRESS') {
            const labelId = `transfer-list-item-${task.id}-label`;
            return (
              <ListItem onClick={(e) => { showEditTaskByID(task.id); }} style={{ backgroundColor: getLiBgColorByOwned(task.owned) }} key={task.id} role='listitem' button >
                <IconButton disabled={!task.owned} onClick={(e) => { e.stopPropagation(); socket.task.requestMoveTask(task.id, 'TODO'); }} edge='end' aria-label='comments'>
                  <ArrowBack />
                </IconButton>
                <ListItemText id={labelId} primary={task.title} />
                <ListItemSecondaryAction>
                  <IconButton disabled={!task.owned} onClick={() => { socket.task.requestMoveTask(task.id, 'DONE'); }} edge='end' aria-label='comments'>
                    <ArrowForward />
                  </IconButton>
                </ListItemSecondaryAction>
              </ListItem>
            );
          }
        })}
        <ListItem />
      </List>
    </Paper>
  );

  const doneList = () => (
    <Paper style={{ height: '80vh', overflow: 'auto' }}>
      <List
        subheader={
          <ListSubheader style={listHeaderStles} component='div' id='nested-list-subheader'>
            Zrobione
          </ListSubheader>
        }
        dense
        component='div'
        role='list'>
        {tasks.tasks.map(task => {
          if (task.position === 'DONE') {
            const labelId = `transfer-list-item-${task.id}-label`;
            return (
              <ListItem onClick={() => { showEditTaskByID(task.id); }} style={{ backgroundColor: getLiBgColorByOwned(task.owned) }} key={task.id} role='listitem' button >
                <IconButton disabled={!task.owned} onClick={(e) => { e.stopPropagation(); socket.task.requestMoveTask(task.id, 'INPROGRESS'); }} edge='end' aria-label='comments'>
                  <ArrowBack />
                </IconButton>
                <ListItemText id={labelId} primary={task.title} />
                <ListItemSecondaryAction>
                  <IconButton disabled={!task.owned} onClick={() => { socket.task.requestDeleteTask(task.id); }} edge='end' aria-label='comments'>
                    <DeleteIcon />
                  </IconButton>
                </ListItemSecondaryAction>
              </ListItem>
            );
          }
        })}
        <ListItem />
      </List>
    </Paper>
  );

  if (user.token !== null) {
    return (
      <Grid
        container
        direction='row'
        style={{ width: 'fit-content', margin: 'auto' }} wrap='nowrap'>
        <Grid item>{toDoList()}</Grid>
        <Grid item>{inProgressList()}</Grid>
        <Grid item>{doneList()}</Grid>
        <BottomMenu />
        <NewTask />
        <EditTask />
      </Grid>
    );
  }
  return (<div />);
};

const mapStoreStateToProps = ({ user, tasks }) => {
  return {
    user: user,
    tasks: tasks
  };
};

export default connect(
  mapStoreStateToProps,
  { setEditVisibility, setToEdit }
)(Main);
