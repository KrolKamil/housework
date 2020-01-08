import { EventEmitter } from 'events';
import store from '../store/store';
import {moveTask, setInitialTasks, addTask} from '../store/tasks/actions';

class Task extends EventEmitter {
  constructor () {
    super();
  }

  restart = () => {
      this.requestGetAllTasks();
    //   this.requestAddTask('agata', 'EBE');
    this.requestMoveTask('5e049eb971be5b0598078759', 'TODO');
  }

  incomingMessage = (type, payload) => {
      switch(type){
        case 'task_all': {
            this.saveAllTasks(payload);
            break;
        }
        case 'task_add-confirmation': {
            this.addTaskToStore(payload);
            break;
        }
        case 'task_move-confirmation': {
            this.moveTaskInStore(payload);
            break;
        }
        default:{
            console.log('task unknown type:' + type);
        }
      }
  }

  serializeTask = (payload) => {
      return {
        id: payload.task._id,
        title: payload.task.title,
        description: payload.task.description,
        position: payload.task.position,
        date: payload.task.timestamp,
        owned: true
      };
  }

  serializeTasks = (payload) => {
    if(payload.length === 0){
        return null;
    }
    let serializedTasks = [];
    payload.forEach(task => {
        const owned = true;
        serializedTasks.push({
            id: task._id,
            title: task.title,
            description: task.description,
            position: task.position,
            date: task.timestamp,
            owned: owned
        })
    });
    return serializedTasks;
  }

  saveAllTasks = (payload) => {
    const serializedTasks = this.serializeTasks(payload);
    store.dispatch(setInitialTasks(serializedTasks));
    // store.dispatch(addTask({name: 'kamil', surname: 'krol'}));
  }

  addTaskToStore = (payload) => {
      const serializedTask = this.serializeTask(payload);
      store.dispatch(addTask(serializedTask));
  }

  moveTaskInStore = (payload) => {
    const serializedTask = this.serializeTask(payload);
    store.dispatch(moveTask(serializedTask));
  }

  requestAddTask = (title, description) => {
    this.emitMessage(JSON.stringify({
        type: 'task_add',
        payload: {
            token: store.getState().user.token,
            title: title,
            description: description,
            timestamp: Date.now()
        }
    }));
  }

  requestGetAllTasks = () => {
    this.emitMessage(JSON.stringify({
        type: 'task_all',
        payload: {
            token: store.getState().user.token
        }
    }));
  }

  requestMoveTask = (taskId, position) => {
    this.emitMessage(JSON.stringify({
        type: 'task_move',
        payload: {
            token: store.getState().user.token,
            id: taskId,
            position: position
        }
    }));
  }

  emitMessage = (message) => {
      console.log(message);
    this.emit('message', message);
  }
}

export default Task;
