import React, { Component, PropTypes as T } from 'react';
import { Link } from 'react-router';

export default class TodoListView extends Component {
  static propTypes = {
    params: T.object
  };

  constructor () {
    super();
  }

  render () {
    return (
      <div className='container-fluid'>
        <div className='row'>
          <div className='col-md'>
            List Of Todos Goes Here
            <Link to='/todos/1'>TodoList 1</Link>
            <Link to='/todos/2'>TodoList 2</Link>
            <Link to='/todos/3'>TodoList 3</Link>
          </div>
        </div>
      </div>
    );
  }
}

//TODO: Add list rendering component/function
//TODO: Add integration with data
//TODO: Cleanup Route logic
