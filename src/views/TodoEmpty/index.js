import React, { Component, PropTypes as T } from 'react';

import TodoService from '../../services/TodoService';

export default class TodoDetail extends Component {
  static propTypes = {
    params: T.object
  };
  static contextTypes = {
    router: T.object
  };
  state = {
    todo: {}
  };

  constructor () {
    super();
    this.setState = this.setState.bind(this);
    this.onAddTodo = this.onAddTodo.bind(this);
  }

  onAddTodo () {
    TodoService.create()
      .then(() => {
        const selected = TodoService.getSelected();

        if (selected && selected.data && selected.data.id) {
          this.context.router.transitionTo(`/todos/${selected.data.id}`);
        }
      });
    this.refreshState();
  }

  refreshState () {
    this.setState({
      todo: TodoService.getSelected()
    });
  }

  render () {
    return (
      <div className='detail-pane'>
        <div className='row'>
          <div className='col-md'>
            <div className='panel panel--outline panel--outline-gray-light'>
              <div className='panel-title bg-gray-light'>
                No Todo Selected Yet!
              </div>
              <div className='panel-body'>
                <p>Select a Todo from the list or add a new one here!</p>
                <button
                  name='add-todo'
                  className='btn bg-blue btn-block color-white'
                  onClick={this.onAddTodo}>
                  <i className='fa fa-plus' /> Add New Todo List
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
