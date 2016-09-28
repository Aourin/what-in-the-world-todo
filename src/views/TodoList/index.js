import React, { Component, PropTypes as T } from 'react';
import Tile       from '../../components/Tile';

import './todo-list-styles.scss';

import TodoService from '../../services/TodoService';

export default class TodoListView extends Component {
  static propTypes = {
    params: T.object,
    history: T.object
  };
  static contextTypes = {
    router: T.object.isRequired
  };
  state = {
    todos: {}
  };

  constructor () {
    super();
    this.setState = this.setState.bind(this);
  }

  componentWillMount () {
    this.setState({
      todos: TodoService.getState()
    });

    //  Still prefer global state, but this will do for now
    TodoService.fetchList()
      .then(() => {
        this.setState({
          todos: TodoService.getState()
        })
      });
  }

  /**
   * Handles selecting a todo from the list
   * @param id
   */
  selectTodo (id) {
    //  I don't like this, but React Router v4 is still trying to figure this out
    TodoService.selectOne(id);
    this.context.router.transitionTo(`/todos/${id}`);
  }

  /**
   * Renders out the state logic for the todo list
   * @returns {XML}
   */
  renderTodosState () {
    const { todos } = this.state;

    if (todos.loading) {
      return <h3>LOADING SOME TODOS</h3>;
    } else if (TodoService.getList()) {
      return this.renderTodos(TodoService.getList());
    } else {
      return <h3>An Error Getting Todos</h3>
    }
  }

  /**
   * Renders a tile list of todos
   * @param todos
   * @returns {*}
   */
  renderTodos (todos) {
    return todos.map(({title, username, id, items}, idx) => {
      return (
        <Tile
          key={idx}
          title={title || 'Untitled'}
          badge={`${items.length} Todos`}
          tag={username || 'No Owner'}
          onClick={() => {this.selectTodo(id)}}/>
      );
    });
  }

  render () {
    return (
      <div className='container-fluid sidebar-list'>
        <div className='row'>
          <div className='col-md'>
            <h3>List O' Todos</h3>
            { this.renderTodosState() }
          </div>
        </div>
      </div>
    );
  }
}

//TODO: Refactor Rendering function to be cleaner
//TODO: Add integration with data
//TODO: Add LOTS of styles
//TODO: Add Error State and Loading State
