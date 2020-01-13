import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import { setNewTaskOpen } from '../store/app/actions';
import socket from '../socket/Socket';

const NewTask = (props) => {
  const { app, setNewTaskOpen } = props;
  const [open, setOpen] = useState(app.newTaskOpen);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  useEffect(() => {
    setOpen(app.newTaskOpen);
  }, [app.newTaskOpen]);

  const handleClickOpen = () => {
    setNewTaskOpen(true);
  };

  const handleClose = () => {
    setNewTaskOpen(false);
  };

  const handleAddTask = () => {
    socket.task.requestAddTask(title, description);
    setTitle('');
    setDescription('');
    handleClose();
  };

  return (
    <div>
      <Button variant='outlined' color='primary' onClick={handleClickOpen}>
        Open form dialog
      </Button>
      <Dialog open={open} onClose={handleClose} aria-labelledby='form-dialog-title'>
        <DialogTitle id='form-dialog-title'>Dodaj nowe zadanie</DialogTitle>
        <DialogContent>
          <TextField
            onChange={(e) => { setTitle(e.target.value); }}
            autoFocus
            margin='dense'
            id='title'
            label='Tytuł'
            type='text'
            fullWidth
            required
            value={title}
          />
          <TextField
            onChange={(e) => { setDescription(e.target.value); }}
            margin='dense'
            id='description'
            label='Opis'
            type='text'
            fullWidth
            value={description}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color='primary'>
            Wróć
          </Button>
          <Button onClick={handleAddTask} color='primary'>
            Potwierdź
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

const mapStoreStateToProps = ({ app }) => {
  return {
    app
  };
};

export default connect(
  mapStoreStateToProps,
  { setNewTaskOpen }
)(NewTask);
