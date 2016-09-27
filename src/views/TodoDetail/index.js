import React, { Component, PropTypes as T } from 'react';
import _                                    from 'lodash';

import InputBuffer from '../../components/InputBuffer';
import TodoItem    from './TodoItem'

export default class TodoDetail extends Component {
  static propTypes = {
    params: T.object
  };
  state = {
    todo: {
      items: []
    },
    buffer: {},
    edit: {}
  };

  constructor () {
    super();
    this.onResetBuffer = this.onResetBuffer.bind(this);
    this.onAddTodo = this.onAddTodo.bind(this);
  }

  /**
   * Sets a prop on the state model
   * @param prop
   * @param value
   */
  onSetProp (propPath, value) {
    const updated = {...this.state.todo};
    _.set(updated, propPath, value);
    console.log('new updated', updated);
    this.setState({
      todo: updated,
      buffer: updated,
      edit: {}
    });
  }

  /**
   * Resets the  buffer
   */
  onResetBuffer () {
    this.setState({
      buffer: {...this.state.todo},
      edit: {}
    });
  }

  /**
   * Sets the buffer state active
   * @param prop
   */
  editBuffer (prop) {
    const newState = {...this.state};
    newState.edit[prop] = true;
    this.setState(newState);
  }

  /**
   * Adds a todo item to the state
   */
  onAddTodo () {
    const todo = {...this.state.todo};
    todo.items.push({
      complete: false
    });

    this.setState({ todo });
  }

  onToggleTodo (idx) {
    const todoList = {...this.state.todo};
    const todoItem = todoList.items[idx];

    todoItem.complete = !todoItem.complete;

    this.setState({
      todo: todoList
    })
  }

  renderTodoEdit (item, idx) {
    return (
      <InputBuffer
        name={`todo-item-${idx}`}
        placeholder='Enter the thing todo'
        className='form-control form-control input input--line-only'
        value={item.label || ''}
        onChange={(e) => {
          this.onSetProp(`items[${idx}].label`, e.target.value);
        }}
        onBlur={this.onResetBuffer}
      />
    )
  }
  /**
   * Renders the title and input
   * @returns {JSX}
   */
  renderTitle () {
    const { todo, buffer, edit } = this.state;

    //  Checks if title is in the edit state
    if (edit.title) {
      return (
        <InputBuffer
          name='title'
          placeholder='Enter Title of Cool Todo List'
          className='form-control form-control-lg input input--line-only'
          value={todo.title || ''}
          onChange={(e) => {
            this.onSetProp('title', e.target.value)
          }}
          onBlur={this.onResetBuffer}/>
      );
    } else {

      //  Creates the title and edit icon
      const title = todo.title ? todo.title : 'Please Add A Title';
      return (
        <span>
          <i className='fa fa-pencil-square-o' onClick={() => this.editBuffer('title')} /> {title}
        </span>
      );
    }
  }

  //TODO: This is getting big, should be refactored into smaller chunks

  /**
   * Render the Todos
   * @returns {JSX}
   */
  renderTodos () {
    const { todo } = this.state;
    const addItem = (
      <button
        className='btn btn-main btn-block'
        onClick={this.onAddTodo}>
        <i className='fa fa-plus' /> Add Item
      </button>
    );

    let listState;

    //  Checks todos and renders the state of the list
    if (Array.isArray(todo.items) && todo.items.length) {
      const items = todo.items.map((item, idx) => {

        let todoItem = (
          <TodoItem
            todo={item}
            onToggle={() => this.onToggleTodo(idx)}
            onEdit={() => this.editBuffer(`Todo:${idx}`) }
            on/>
        );

        //  Check if Todo is in edit state
        if (this.state.edit[`Todo:${idx}`]) {
          todoItem = this.renderTodoEdit(item, idx);
        }

        return (
          <li key={idx}>
            {todoItem}
          </li>
        );
      });

      listState =(
        <ul className='list'>
          {items}
        </ul>
      );
    } else {

      //  Sets empty state
      listState = (
        <div className='text-md-center m-y-1 text-muted'>
         <h1> <i className='fa fa-leaf fa-3 color-green' /></h1>
          <p className='p-x-4'>
            Hate to leaf you hangin', but it looks like you have nothing to do my friend.
            Try adding another item or mess with those fancy <i className='fa fa-toggle-off color-green' /> filter things.
          </p>
        </div>
      );
    }

    return (
      <div className=''>
        {listState}
        {addItem}
      </div>
    );
  }

  render () {
    const { params } = this.props;

    return (
      <div className='detail-pane'>
        <div className='row'>
          <div className='col-md'>
            <div className='panel panel--outline panel--outline-main'>
              <div className='panel-title bg-main color-white'>
                {this.renderTitle()}
              </div>
              <div className='panel-body'>
                {this.renderTodos()}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

//TODO: Refactor todo items into separte comp
//TODO: Refactor empty state to generic empty state comp for reuse
//TODO: Experimenting with view only state handling pattern thingy
//TODO: Reorganize functions by group
//  Potential state issue with how it is tracked by array index
