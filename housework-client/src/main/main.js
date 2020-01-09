import React from 'react';
import { connect } from 'react-redux';
import Grid from '@material-ui/core/Grid';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Checkbox from '@material-ui/core/Checkbox';
import Paper from '@material-ui/core/Paper';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import IconButton from '@material-ui/core/IconButton';
import ArrowForward from '@material-ui/icons/ArrowForward';
import ArrowBack from '@material-ui/icons/ArrowBack';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
  paper: {
    width: 200,
    height: 230,
    overflow: 'auto'
  }
}));

const Main = (props) => {
  const { token, tasks } = props;
  console.log('tasks');
  console.log(tasks);

  const toDoList = () => (
    <Paper style={{ height: '80vh', overflow: 'auto' }}>
      <List dense component='div' role='list'>
        {tasks.map(task => {
          const labelId = `transfer-list-item-${task.id}-label`;
          return (
            <ListItem key={task.id} role='listitem' button >
              <ListItemText id={labelId} primary={task.title} />
              <ListItemSecondaryAction>
                <IconButton edge='end' aria-label='comments'>
                  <ArrowForward />
                </IconButton>
              </ListItemSecondaryAction>
            </ListItem>
          );
        })}
        <ListItem />
      </List>
    </Paper>
  );

  const inProgressList = () => (
    <Paper style={{ height: '80vh', overflow: 'auto' }}>
      <List dense component='div' role='list'>
        {tasks.map(task => {
          const labelId = `transfer-list-item-${task.id}-label`;
          return (
            <ListItem key={task.id} role='listitem' button >
              <IconButton edge='end' aria-label='comments'>
                <ArrowBack />
              </IconButton>
              <ListItemText id={labelId} primary={task.title} />
              <ListItemSecondaryAction>
                <IconButton edge='end' aria-label='comments'>
                  <ArrowForward />
                </IconButton>
              </ListItemSecondaryAction>
            </ListItem>
          );
        })}
        <ListItem />
      </List>
    </Paper>
  );

  const doneList = () => (
    <Paper style={{ height: '80vh', overflow: 'auto' }}>
      <List dense component='div' role='list'>
        {tasks.map(task => {
          const labelId = `transfer-list-item-${task.id}-label`;
          return (
            <ListItem key={task.id} role='listitem' button >
              <IconButton edge='end' aria-label='comments'>
                <ArrowBack />
              </IconButton>
              <ListItemText id={labelId} primary={task.title} />
            </ListItem>
          );
        })}
        <ListItem />
      </List>
    </Paper>
  );

  return (
    <Grid container>
      <Grid item>{toDoList()}</Grid>
      <Grid item>{inProgressList()}</Grid>
      <Grid item>{doneList()}</Grid>
    </Grid>
  );
};

const mapStoreStateToProps = ({ user, tasks }) => {
  return {
    ...user,
    tasks: [...tasks]
  };
};

export default connect(
  mapStoreStateToProps,
  null
)(Main);
