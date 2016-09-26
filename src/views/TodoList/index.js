import React, { Component, PropTypes as T } from 'react';
import { Link }   from 'react-router';
import Tile       from '../../components/Tile';
import MOCK_DATA  from './mock';

import './todo-list-styles.scss';

export default class TodoListView extends Component {
  static propTypes = {
    params: T.object,
    history: T.object
  };
  state = {
    todos: MOCK_DATA
  };
  constructor () {
    super();
  }

  selectTodo (id) {
    console.log('selected', id);
    this.props.history.push(`/todos/${id}`);
  }

  renderTodos () {
    const { todos } = this.state;
    console.log('this.conte', this.context);
    return todos.map(({title, user, id}, idx) => {

      return <Link to={`/todos/${id}`} >Go To { id }</Link>;
      // return (
      //   <Tile
      //     key={idx}
      //     title={title}
      //     content={user && user.email}
      //     onClick={() => {this.selectTodo(id)}}/>
      // );
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
