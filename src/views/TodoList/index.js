import React, { Component, PropTypes as T } from 'react';
import Tile from '../../components/Tile';
import './todo-list-styles.scss';

export default class TodoListView extends Component {
  static propTypes = {
    params: T.object
  };
  state = {
    todos: [
      {
        title: 'Willy\'s Todo',
        user: {
          email: 'fishmoo@fishcheesemoo.com',
          name: 'Whacky Willy'
        }
      },
      {
        title: 'Off To The Mines',
        user: {
          email: 'miningguy@fishcheesemoo.com',
          name: 'Mine Guy'
        }
      }
    ]
  };
  constructor () {
    super();
  }

  renderTodos () {
    const { todos } = this.state;

    return todos.map(({title, user}) => {
      return (
        <Tile
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
