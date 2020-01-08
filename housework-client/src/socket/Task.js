import { EventEmitter } from 'events';
import store from '../store/store';
import {setInitialTasks} from '../store/tasks/actions';
import {register} from '../store/user/actions';

class Task extends EventEmitter {
  constructor () {
    super();
  }

  restart = () => {
      this.requestGetAllTasks();
  }

  incomingMessage = (type, payload) => {
      switch(type){
        case 'task_all': {
            this.saveAllTasks(payload);
            break;
        }
        default:{
            console.log('task unknown type:' + type);
        }
      }
  }

  serializeTasks = (payload) => {
    if(payload.length === 0){
        return null;
    }
    let serializedTasks = [];
    payload.forEach(task => {
        const owned = false;
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
  }

  requestGetAllTasks = () => {
    this.emitMessage(JSON.stringify({
        type: 'task_all',
        payload: {
            token: store.getState().user.token
        }
    }))
  }

  emitMessage = (message) => {
      console.log(message);
    this.emit('message', message);
  }
}

export default Task;
