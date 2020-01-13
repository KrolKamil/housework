import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import { setNewTaskOpen } from '../store/app/actions';

const NewTask = (props) => {
  const { app, setNewTaskOpen } = props;
  const [open, setOpen] = useState(app.newTaskOpen);

  useEffect(() => {
    setOpen(app.newTaskOpen);
  }, [app.newTaskOpen]);

  const handleClickOpen = () => {
    setNewTaskOpen(true);
  };

  const handleClose = () => {
    setNewTaskOpen(false);
  };

  return (
    <div>
      <Button variant='outlined' color='primary' onClick={handleClickOpen}>
        Open form dialog
      </Button>
      <Dialog open={open} onClose={handleClose} aria-labelledby='form-dialog-title'>
        <DialogTitle id='form-dialog-title'>Dodaj nowe zadanie</DialogTitle>
        <DialogContent>
          <DialogContentText>
            To subscribe to this website, please enter your email address here. We will send updates
            occasionally.
          </DialogContentText>
          <TextField
            autoFocus
            margin='dense'
            id='name'
            label='Email Address'
            type='email'
            fullWidth
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color='primary'>
            Cancel
          </Button>
          <Button onClick={handleClose} color='primary'>
            Subscribe
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
