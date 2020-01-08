import { EventEmitter } from 'events';

class Task extends EventEmitter {
  constructor () {
    super();
  }
}

export default Task;
