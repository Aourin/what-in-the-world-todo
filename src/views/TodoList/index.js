import React, { Component, PropTypes as T } from 'react';
import Tile from '../../components/Tile';
import MOCK_DATA from './mock';
import './todo-list-styles.scss';

export default class TodoListView extends Component {
  static propTypes = {
    params: T.object
  };
  state = {
    todos: MOCK_DATA
  };
  constructor () {
    super();
  }

  renderTodos () {
    const { todos } = this.state;

    return todos.map(({title, user}, idx) => {
      return (
        <Tile
          key={idx}
          title={title}
          content={user && user.email} />
      );
    });
  }

  render () {
    return (
      <div className='container-fluid sidebar-list'>
        <div className='row'>
          <div className='col-md'>
            <h3>List O' Todos</h3>
            { this.renderTodos() }
          </div>
        </div>
      </div>
    );
  }
}

//TODO: Refactor Rendering function to be cleaner
//TODO: Add integration with data
//TODO: Cleanup Route logic
//TODO: Add LOTS of styles
//TODO: Remove mock data
