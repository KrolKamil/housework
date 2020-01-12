import {EventEmitter} from 'events';
import Task from './Task';
import Connection from './Connection';

class Socket extends EventEmitter {
  constructor () {
    super();
    this.connection = new Connection();
    this.task = new Task();
    this.socket = null;
  }

  start = () => {
    this.setHandlerListeners();
    // this.socket = new WebSocket('ws://housework-api.herokuapp.com');
    this.socket = new WebSocket('ws://localhost:3000');
    this.pingInterval = null;
    this.setSocketListeners();
  }

  setHandlerListeners = () => {
    this.connection.on('message', this.handleMessage);
    this.task.on('message', this.handleMessage);
  }

  handleMessage = (message) => {
    this.socket.send(message);
  }

  setSocketListeners = () => {
    this.socket.addEventListener('open', this.openListener);
    this.socket.addEventListener('message', this.messageListener);
    this.socket.addEventListener('error', this.errorListener);
    this.socket.addEventListener('close', this.closeListener);
  }

  openListener = () => {
    this.connection.restart();
    this.task.restart();
  }

  messageListener = async (message) => {
    const parsedMessage = await JSON.parse(message.data);
    console.log("Pure message: " + parsedMessage.type);
    const rootType = this.getRootType(parsedMessage.type);
    switch(rootType){
      case 'pong': {
        this.connection.incomingMessage(parsedMessage.type);
        break;
      }
      case 'task': {
        this.task.incomingMessage(parsedMessage.type, parsedMessage.payload);
        break;
      }
      default: {
        console.log('unknown type: ' + parsedMessage);
      }
    }
  }

  closeListener = () => {
    // dispatch closed
  }

  errorListener = () => {

  }

  getRootType = (type) => {
    const index = type.search('_');
    if(index === -1){
      return type;
    }
    return type.substring(0, index);
  }
}

const socketObject = new Socket();
export default socketObject;
